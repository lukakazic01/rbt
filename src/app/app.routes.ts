import { Routes } from '@angular/router';
import {Task1Component} from "../views/task-1/task1.component";
import {Task2Component} from "../views/task-2/task2.component";
import {Task3Component} from "../views/task-3/task3.component";
import {SingleMovieComponent} from "../views/single-movie/single-movie.component";

export const routes: Routes = [
  {
    component: Task1Component,
    path: '',
  },
  {
    component: Task2Component,
    path: 'task-2',
  },
  {
    component: Task3Component,
    path: 'task-3'
  },
  {
    component: SingleMovieComponent,
    path: 'task-3/:id'
  }
];
