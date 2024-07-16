import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../../types/movie";


@Injectable({
  providedIn: 'root'
})

export class Task3Service {

  constructor(private http: HttpClient) {
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies');
  }
}
