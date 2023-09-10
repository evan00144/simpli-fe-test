import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjczMjBiMDllYTFjYTNjNmM5MzQyMjhmZGFhN2VhMiIsInN1YiI6IjY0ZmQ0OTMyZGI0ZWQ2MTAzODU0OTFkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZJc5FByDZQ-KAJ6aZh3wu9uxB2WmEj_PQyRB2nzKw8o';

  constructor(private http: HttpClient) {}

  params = {
    language: 'en-US',
  };
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });
  requestOptions = {
    headers: this.headers,
    params: {
      language: 'en-US',
    },
  };

  getNowPlayingMovies(page: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/now_playing?page=${page}`;

    return this.http.get(url, this.requestOptions);
  }
  getMovieDetails(id: string): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

    return this.http.get(url, this.requestOptions);
  }
}
