import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../../types/Movie";


@Injectable({
  providedIn: 'root'
})

export class Task3Service {

  constructor(private http: HttpClient) {
  }

  private apiUrl = 'https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies';

  getAllMovies(categoryId?: number): Observable<Movie[]> {
    if (categoryId) return this.http.get<Movie[]>(this.apiUrl, { params: {categoryId} });
    else return this.http.get<Movie[]>(this.apiUrl);
  }
}
