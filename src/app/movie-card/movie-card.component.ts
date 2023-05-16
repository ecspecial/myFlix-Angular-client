import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

/**
 * Component to display a movie card.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  
  /**
   * The list of movies.
   */
  movies: any[] = [];

  /**
   * The list of favorite movies.
   */
  favorites: any[] = [];

  /**
   * @param fetchApiData - Service to fetch API data.
   * @param dialog - Service to open dialogs.
   * @param snackBar - Service to open snackbars.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) {}

    /**
   * This method will be executed when the component is initialized.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Method to get all movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    })
  }

  /**
   * Method to get all favorite movies.
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    })
  }

  /**
   * Method to add a movie to the favorites.
   * @param id - The id of the movie.
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((resp) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Method to remove a movie from the favorites.
   * @param id - The id of the movie.
   */
  removeFavorite(id: string): void {
    this.fetchApiData.removeFavoriteMovies(id).subscribe((resp) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Method to check if a movie is a favorite.
   * @param id - The id of the movie.
   * @returns {boolean} - Returns true if the movie is a favorite, otherwise false.
   */
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * Method to open the genre details dialog.
   * @param name - The name of the genre.
   * @param description - The description of the genre.
   */
  openGenreDetails(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      }
    });
  }

  /**
   * Method to open the director details dialog.
   * @param name - The name of the director.
   * @param bio - The bio of the director.
   * @param birth - The birth date of the director.
   */
  openDirectorDetails(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      }
    });
  }

  /**
   * Method to open the movie details dialog.
   * @param title - The title of the movie.
   * @param director - The director of the movie.
   * @param genre - The genre of the movie.
   * @param description - The description of the movie.
   * @param image - The image of the movie.
   */
  openMovieDetails(title: string, director: string, genre: string, description: string, image: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        Director: director,
        Genre: genre,
        Description: description,
        Image: image,
      }
    });
  }
}
