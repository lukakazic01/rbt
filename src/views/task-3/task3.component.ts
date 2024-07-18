import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from "@angular/core";
import {Task3Service} from "./task3.service";
import {CommonModule} from "@angular/common";
import {Movie} from "../../types/movie";
import {Task3MovieCardComponent} from "../../components/task-3-movie-card/task-3-movie-card.component";
import {Task3CategoriesComponent} from "../../components/task-3-categories/task-3-categories.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LoaderComponent} from "../../components/loader/loader.component";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  templateUrl: 'task3.component.html',
  styleUrl: 'task3.component.scss',
  selector: 'app-task3',
  imports: [CommonModule, Task3MovieCardComponent, Task3CategoriesComponent, LoaderComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Task3Component implements OnInit{

  constructor(private task3Service: Task3Service,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  destroyRef = inject(DestroyRef);
  movies = signal<Movie[] | null>(null) ;
  isLoading = signal(true)
  isError = signal(false)

  ngOnInit() {
    this.isLoading .set(true)
    this.fetchMovies()
  }

  /*
   I've used here filtering from the mockapi.io, but when the categoryId of 1 is passed, it doesn't filter it correctly
   It includes filter 10 and 11 as well, so I wasn't sure what should I do, so I left it like this
   In my git commit history, before I've used mockapi.io filtering method, I did all of this without it which worked
  */
  handleMoviesUpdate(categoryId: number) {
    this.isLoading.set(true)
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { categoryId },
      }
    ).then();
    this.fetchMovies(categoryId)
  }

  fetchMovies(categoryId?: number) {
    this.isLoading.set(true);
    this.task3Service.getAllMovies(categoryId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.movies.set(res)
        this.isLoading.set(false)
      },
      error: () => {
        this.isError.set(true)
        this.isLoading.set(false)
      }
    })
  }
  handleFilterResetting() {
    this.fetchMovies()
  }

  trackByMovie(index: number, movie: Movie) {
    return parseInt(movie.id)
  }
}
