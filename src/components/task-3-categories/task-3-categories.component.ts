import {Component, OnInit} from "@angular/core";
import {Task3CategoriesService} from "./task-3-categories.service";
import {Category} from "../../types/category";
import {CommonModule} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
  standalone: true,
  templateUrl: 'task-3-categories.component.html',
  styleUrl: 'task-3-categories.component.scss',
  selector: 'app-task-3-categories',
  imports: [CommonModule]
})

export class Task3CategoriesComponent implements OnInit{

  constructor(private task3CategoriesService: Task3CategoriesService) {
  }

  categories: Category[] | null = null

  trackByCategory(index: number, category: Category) {
    return category.id
  }

  ngOnInit() {
    this.task3CategoriesService.getAllCategories().pipe(takeUntilDestroyed()).subscribe({
      next: (res) => this.categories = res,
    })
  }
}
