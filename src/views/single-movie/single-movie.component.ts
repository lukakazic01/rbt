import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, SecurityContext, signal} from "@angular/core";
import {SingleMovieService} from "./single-movie.service";
import {ActivatedRoute} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Movie, MovieComment, MovieWithCommentsAndVideoId} from "../../types/Movie";
import {CommonModule} from "@angular/common";
import {catchError, forkJoin, map, of} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {LoaderComponent} from "../../components/loader/loader.component";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Video} from "../../types/Video";
import {AuthOnlyComponent} from "../../components/auth-only/auth-only.component";


@Component({
  selector: 'app-single-movie',
  templateUrl: 'single-movie.component.html',
  styleUrls: ['single-movie.component.scss'],
  standalone: true,
  imports: [CommonModule, LoaderComponent, ReactiveFormsModule, AuthOnlyComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SingleMovieComponent implements OnInit{

  constructor(private singleMovieService: SingleMovieService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer) {}

  destroy = inject(DestroyRef)
  comment = new FormControl('', { nonNullable: true, validators: Validators.required });
  movieId: number = this.activatedRoute.snapshot.params['id']
  imdbId: string = this.activatedRoute.snapshot.queryParams['imdbId']
  safeUrl: SafeResourceUrl = ''
  singleMovie = signal<MovieWithCommentsAndVideoId | null>(null)
  isLoading = signal(false)

  ngOnInit() {
    const $getTrailer = this.singleMovieService.getMovieTrailers(this.imdbId);
    const $singleMovie = this.singleMovieService.getSingleMovie(this.movieId)
    const $commentForSingleMovie = this.singleMovieService.getCommentsForSingleMovie(this.movieId).pipe(catchError(() => of(null)))
    this.isLoading.set(true)
    forkJoin<[Movie, MovieComment[] | null, Video]>([$singleMovie, $commentForSingleMovie, $getTrailer])
      .pipe(
        takeUntilDestroyed(this.destroy),
        map((res: [Movie, MovieComment[] | null, Video]): MovieWithCommentsAndVideoId => {
          return {
            ...res[0],
            comments: res[1],
            videoId: res[2].items[0].id.videoId
          }
        })
      ).subscribe({
      next: (res) => {
        this.singleMovie.set(res)
        const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.URL, `https://www.youtube.com/embed/${res.videoId}`);
        if (sanitizedUrl) this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sanitizedUrl)
        this.isLoading.set(false)
      },
      error: (err) => {
        this.isLoading.set(false)
      }
    });
  }

  trackByCommentId(index: number, comment: MovieComment) {
    return parseInt(comment.id)
  }

  get isCommentControlInErrorState() {
    return this.comment.hasError('required') && (this.comment.touched || this.comment.dirty)
  }

  createNewComment() {
    this.comment.markAsDirty()
    this.comment.markAsTouched()
    this.comment.updateValueAndValidity()
    if(this.comment.valid) {
      this.singleMovieService.postComment(this.movieId, { comment: this.comment.value })
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe({
        next: (res) => {
          this.singleMovie.update((movie) => {
            if(movie) {
              if(movie.comments) return {...movie, comments: [...movie?.comments, res]}
              else return {...movie, comments: [res]}
            } else return movie;
          })
          this.comment.reset();
        }
      })
    }
  }
}
