import {Component, DestroyRef, inject, OnDestroy, OnInit} from "@angular/core";
import {Task3Service} from "./task3.service";
import {CommonModule} from "@angular/common";
import {Movie} from "../../types/movie";
import {Task3MovieCardComponent} from "../../components/task-3-movie-card/task-3-movie-card.component";
import {Subject, takeUntil} from "rxjs";
import {Task3CategoriesComponent} from "../../components/task-3-categories/task-3-categories.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
  templateUrl: 'task3.component.html',
  styleUrl: 'task3.component.scss',
  selector: 'app-task3',
  imports: [CommonModule, Task3MovieCardComponent, Task3CategoriesComponent],
  standalone: true,
})

export class Task3Component implements OnInit{

  constructor(private task3Service: Task3Service) {}

  allMovies: Movie[] | null = null
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.task3Service.getAllMovies().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => this.allMovies = res,
    })
  }

  trackByMovie(index: number, movie: Movie) {
    return parseInt(movie.id)
  }
}
