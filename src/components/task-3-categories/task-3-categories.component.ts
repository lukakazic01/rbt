import {Component, DestroyRef, EventEmitter, inject, Output} from "@angular/core";
import {Task3CategoriesService} from "./task-3-categories.service";
import {Category} from "../../types/category";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@Component({
  standalone: true,
  templateUrl: 'task-3-categories.component.html',
  styleUrl: 'task-3-categories.component.scss',
  selector: 'app-task-3-categories',
  imports: [CommonModule, FormsModule]
})

export class Task3CategoriesComponent {

  constructor(private task3CategoriesService: Task3CategoriesService) {}


  $categories = this.task3CategoriesService.getAllCategories()
  category: string = 'Select Category';
  @Output() updateMovies: EventEmitter<number> = new EventEmitter<number>();
  @Output() resetFilters: EventEmitter<null> = new EventEmitter<null>();
  trackByCategory(index: number, category: Category) {
    return category.id
  }

  handleCategoryChange() {
    this.updateMovies.emit(parseInt(this.category))
  }

  handleFilterResetting() {
    this.resetFilters.emit();
    this.category = 'Select Category'
  }
}
