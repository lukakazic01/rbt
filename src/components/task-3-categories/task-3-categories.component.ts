import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {Task3CategoriesService} from "./task-3-categories.service";
import {Category} from "../../types/category";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  standalone: true,
  templateUrl: 'task-3-categories.component.html',
  styleUrl: 'task-3-categories.component.scss',
  selector: 'app-task-3-categories',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Task3CategoriesComponent {

  constructor(private task3CategoriesService: Task3CategoriesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}


  $categories = this.task3CategoriesService.getAllCategories()
  category: string = 'Select Category';
  categoryIdQueryParams = this.activatedRoute.snapshot.queryParams['categoryId']
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
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { categoryId: null },
      }
    ).then()
  }
}
