import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'
import { FetchApiDataService } from '../fetch-api-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: BehaviorSubject<boolean>;
  constructor(private fetchApiData: FetchApiDataService) {
    this.isLogged = new BehaviorSubject<boolean>(false);
  }

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
