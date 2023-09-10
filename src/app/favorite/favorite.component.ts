import { Component } from '@angular/core';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  movies: any = [];
  constructor(private favoriteService: FavoriteService) {}
  ngOnInit() {
    this.loadMovies();
  }
  loadMovies() {
    this.movies = this.favoriteService.getFavorites();
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
    this.loadMovies()
  }
  isFavorite(movie: any): boolean {
    const favorites = this.favoriteService.getFavorites();
    return favorites.some((favMovie) => favMovie.id === movie.id);
  }
}
