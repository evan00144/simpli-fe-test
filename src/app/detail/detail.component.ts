import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  movie: any;
  id: any;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.isLoading = true;
    this.movieService.getMovieDetails(this.id).subscribe((data) => {
      this.movie = data;
      this.isLoading = false;
    });
  }

  getGenreName(genre: any) {
    return genre?.name;
  }

  getBackdropUrl(backdropPath: string): string {
    if (!backdropPath) {
      return 'url-to-fallback-image.jpg';
    }

    const baseUrl = 'https://image.tmdb.org/t/p/original';
    return baseUrl + backdropPath;
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
