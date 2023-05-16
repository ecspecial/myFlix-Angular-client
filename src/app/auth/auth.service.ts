import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * AuthService is responsible for managing the authentication state.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    /**
   * A BehaviorSubject that represents the current authentication state.
   */
  isLogged: BehaviorSubject<boolean>;

  /**
   * @param {FetchApiDataService} fetchApiData - An instance of FetchApiDataService.
   */
  constructor(private fetchApiData: FetchApiDataService) {
    this.isLogged = new BehaviorSubject<boolean>(false);
  }

  /**
   * Function sets the current authentication state.
   *
   * @param {any} token - The authentication token. If the token is present, the state will be set to true. If not, the state will be set to false.
   * @return {Observable<boolean>} Returns an Observable that represents the current authentication state.
   */
  setLoggedIn(token: any): Observable<boolean>{
    if (token) {
      this.isLogged.next(true);
    }
    if (!token) {
      this.isLogged.next(false);
    }
    return this.isLogged.asObservable();
}
}
