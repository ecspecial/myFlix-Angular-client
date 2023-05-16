import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://ga3lvkvqynglokokkhtrad65jy0rsexv.lambda-url.eu-central-1.on.aws';

/**
 * This service provides methods to make HTTP requests to the API.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  
  /**
   * @param http - Inject the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via this.http.
   */
  constructor(private http: HttpClient) { }

  /**
   * Making the API call for the user registration endpoint.
   * @param userDetails - The user details to register.
   * @returns An Observable of the HTTP request.
   */
  userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Making the API call for the user login endpoint.
   * @param userDetails - The user details to login.
   * @returns An Observable of the HTTP request.
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
        );
  }

  /**
   * Get all movies from the API.
   * @returns An Observable of the HTTP request.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, 
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get a single movie by its title from the API.
   * @param title - The title of the movie.
   * @returns An Observable of the HTTP request.
   */
  getSingleMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, 
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get a director by name from the API.
   * @param directorName - The name of the director.
   * @returns An Observable of the HTTP request.
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, 
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get a genre by name from the API.
   * @param genreName - The name of the genre.
   * @returns An Observable of the HTTP request.
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, 
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  /**
   * Get the current user from the API.
   * @returns An Observable of the HTTP request.
   */
  getUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, 
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get the favorite movies of the current user from the API.
   * @returns An Observable of the HTTP request.
   */
  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, 
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
        );
  }

  /**
   * Add a movie to the favorite list of the current user.
   * @param movieID - The ID of the movie to add.
   * @returns An Observable of the HTTP request.
   */
  addFavoriteMovie(movieID: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .post(`${apiUrl}/users/${username}/movies/${movieID}`, {FavoriteMovies: movieID}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, 
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Update the details of the current user.
   * @param updatedUser - The new details of the user.
   * @returns An Observable of the HTTP request.
   */
  updateUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}/users/${username}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, 
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete the current user.
   * @returns An Observable of the HTTP request.
   */
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, 
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Remove a movie from the favorite list of the current user.
   * @param movieID - The ID of the movie to remove.
   * @returns An Observable of the HTTP request.
   */
  removeFavoriteMovies(movieID: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token, 
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Extract the body from the HTTP response.
   * @param res - The HTTP response.
   * @
   * returns The body of the HTTP response.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handle any errors from the HTTP request.
   * @param error - The error to handle.
   * @returns An Observable error.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
