import {Component, Input} from "@angular/core";
import {Movie} from "../../types/movie";
import {RouterLink} from "@angular/router";


@Component({
  standalone: true,
  styleUrl: 'task-3-movie-card.component.scss',
  templateUrl: 'task-3-movie-card.component.html',
  imports: [
    RouterLink
  ],
  selector: 'app-task-3-movie-card'
})

export class Task3MovieCardComponent {

  @Input('movie') movie: Movie | null = null
}
