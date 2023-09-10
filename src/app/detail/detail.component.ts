import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  movie: any; // Define a property to store movie details
  id: any;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router

  ) {}

  ngOnInit(): void {
    // Retrieve movie data from route parameters
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.isLoading = true;
    this.movieService.getMovieDetails(this.id).subscribe((data) => {
      this.movie = data;
      this.isLoading = false;
    });
  }

  // Define a method to convert genre IDs to genre names based on your data
  getGenreName(genre: any) {
    return genre?.name;
  }

  getBackdropUrl(backdropPath: string): string {
    if (!backdropPath) {
      // Provide a fallback image or handle the case where backdropPath is null or empty
      return 'url-to-fallback-image.jpg';
    }

    const baseUrl = 'https://image.tmdb.org/t/p/original'; // Adjust the base URL as needed
    return baseUrl + backdropPath;
  }
  goBack() {
    this.router.navigate(['/']); // Navigate to the home page or the appropriate route
  }

}
