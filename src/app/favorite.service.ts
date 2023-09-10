import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly storageKey = 'favoriteMovies';

  constructor() {}

  getFavorites(): any[] {
    const favoritesJson = localStorage.getItem(this.storageKey);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

  addFavorite(movie: any): void {
    const favorites = this.getFavorites();
    favorites.push(movie);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
  updateFavorites(favorites: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
