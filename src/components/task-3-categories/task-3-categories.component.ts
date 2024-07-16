import {Component, OnDestroy, OnInit} from "@angular/core";
import {Task3CategoriesService} from "./task-3-categories.service";
import {Category} from "../../types/category";
import {Subject, takeUntil} from "rxjs";
import {CommonModule} from "@angular/common";


@Component({
  standalone: true,
  templateUrl: 'task-3-categories.component.html',
  styleUrl: 'task-3-categories.component.scss',
  selector: 'app-task-3-categories',
  imports: [CommonModule]
})

export class Task3CategoriesComponent implements OnInit, OnDestroy{

  constructor(private task3CategoriesService: Task3CategoriesService) {
  }

  categories: Category[] | null = null
  $destroy: Subject<boolean> = new Subject<boolean>();

  trackByCategory(index: number, category: Category) {
    return category.id
  }

  ngOnInit() {
    this.task3CategoriesService.getAllCategories().pipe(takeUntil(this.$destroy)).subscribe({
      next: (res) => this.categories = res,
    })
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }
}
