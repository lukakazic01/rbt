import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie, MovieComment} from "../../types/movie";
import {Video} from "../../types/video";


@Injectable({
  providedIn: 'root'
})

export class SingleMovieService {

  constructor(private http: HttpClient) {}

  getSingleMovie(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies/${movieId}`)
  }

  getCommentsForSingleMovie(movieId: number): Observable<MovieComment[]> {
    return this.http.get<MovieComment[]>(`https://5fe8885b2e12ee0017ab47c0.mockapi.io/api/v1/movies/${movieId}/comments`)
  }

  getMovieTrailers(imdbId: string): Observable<Video> {
    const searchQuery = `${imdbId} trailer`;
    const apiKey = 'AIzaSyCkgDBw6mO28l2ibDbkQOU8Vg7yz2R39wc'
    const apiUrl = 'https://www.googleapis.com/youtube/v3/search';
    const url = `${apiUrl}?&q=${searchQuery}&key=${apiKey}&type=video`;
    return this.http.get<Video>(url);
  }
}
