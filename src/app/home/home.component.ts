import { Component, HostListener, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: any = [];
  page = 1;
  totalPages: number = 0;
  isLoading = false;
  constructor(
    private movieService: MovieService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.loadMovies();
  }
  addToFavorites(movie: any): void {
    const favorites = this.favoriteService.getFavorites();
    if (favorites.find((e) => e.id === movie.id)) {
      this.favoriteService.updateFavorites(
        favorites.filter((e) => e.id !== movie.id)
      );
    } else {
      this.favoriteService.addFavorite(movie);
    }
  }
  isFavorite(movie: any): boolean {
    const favorites = this.favoriteService.getFavorites();
    return favorites.some((favMovie) => favMovie.id === movie.id);
  }


  loadMovies() {
    this.isLoading = true; // Set loading flag to true
    setTimeout(() => {
      this.movieService
        .getNowPlayingMovies(this.page)
        .subscribe((data: any) => {
          this.movies.push(...data.results);
          this.totalPages = data.total_pages;
          this.isLoading = false; // Set loading flag to false when data is loaded
        });
    }, 1000);
  }

  onScroll(): void {
    if (this.page < this.totalPages) {
      this.page++; // Increment the page number
      this.loadMovies(); // Load more movies
    }
  }
}
