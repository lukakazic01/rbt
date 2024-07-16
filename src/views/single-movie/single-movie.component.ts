import {Component, DestroyRef, inject, Input, OnInit, signal} from "@angular/core";
import {SingleMovieService} from "./single-movie.service";
import {ActivatedRoute} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Movie, MovieComment, MovieWithCommentsAndVideoId} from "../../types/movie";
import {CommonModule} from "@angular/common";
import {forkJoin, map} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Video} from "../../types/video";


@Component({
  selector: 'app-single-movie',
  templateUrl: 'single-movie.component.html',
  styleUrl: 'single-movie.component.scss',
  standalone: true,
  imports: [CommonModule]
})

export class SingleMovieComponent implements OnInit{

  constructor(private singleMovieService: SingleMovieService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer) {}

  movieId: number = this.activatedRoute.snapshot.params['id']
  destroy = inject(DestroyRef)
  singleMovie = signal<MovieWithCommentsAndVideoId | null>(null)
  imdbId: string = this.activatedRoute.snapshot.queryParams['imdbId']
  safeUrl: SafeResourceUrl = ''
  ngOnInit() {
    const $getTrailer = this.singleMovieService.getMovieTrailers(this.imdbId);
    const $singleMovie = this.singleMovieService.getSingleMovie(this.movieId)
    const $commentForSingleMovie = this.singleMovieService.getCommentsForSingleMovie(this.movieId)
    forkJoin<[Movie, MovieComment[], Video]>([$singleMovie, $commentForSingleMovie, $getTrailer])
      .pipe(
        takeUntilDestroyed(this.destroy),
        map((res: [Movie, MovieComment[], Video]): MovieWithCommentsAndVideoId => {
          return {
            ...res[0],
            comments: res[1],
            videoId: res[2].items[0].id.videoId
          }
        })
      ).subscribe({
      next: (res) => {
        this.singleMovie.set(res)
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${res.videoId}`);
      },
    });
  }
}
