import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../types/category";


@Injectable({
  providedIn: 'root'
})

export class Task3CategoriesService {

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/categories')
  }
}
