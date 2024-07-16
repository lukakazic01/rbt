import {Component, DestroyRef, inject} from "@angular/core";
import {Task3CategoriesService} from "./task-3-categories.service";
import {Category} from "../../types/category";
import {CommonModule} from "@angular/common";


@Component({
  standalone: true,
  templateUrl: 'task-3-categories.component.html',
  styleUrl: 'task-3-categories.component.scss',
  selector: 'app-task-3-categories',
  imports: [CommonModule]
})

export class Task3CategoriesComponent {

  constructor(private task3CategoriesService: Task3CategoriesService) {}

  $categories = this.task3CategoriesService.getAllCategories()

  trackByCategory(index: number, category: Category) {
    return category.id
  }
}
