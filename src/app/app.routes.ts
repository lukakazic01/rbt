import { Routes } from '@angular/router';
import {Task1Component} from "./task-1/task1.component";
import {Task2Component} from "./task-2/task2.component";
export const routes: Routes = [
  {
    component: Task1Component,
    path: '',
  },
  {
    component: Task2Component,
    path: 'task-2',
  }
];
