import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for the User Profile.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  /**
   * User object to store user data.
   */
  user: any = {};
  
  /**
   * Movies array to store movie data.
   */
  movies: any[] = [];
  
  /**
   * favoriteMovies array to store favorite movie data.
   */
  favoriteMovies: any[] = [];

  /**
   * Input decorator to get updated user data.
   */
  @Input() updatedUser = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @param fetchApiData - Service to call the API methods.
   * @param router - Service to do the routing.
   * @param snackBar - Service to call the snack-bar.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    ) { }

  /**
   * Method that is executed when the component is initialized.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Method to get the user data.
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = this.user.Birthday;
      return this.user;
    })
  }

  /**
   * Method to update user profile.
   */
  updateProfile(): void {
    this.fetchApiData.updateUser(this.updatedUser).subscribe((resp) => {
      this.snackBar.open('User profile successfuly updated', 'OK', {
        duration: 2000,
      });
      localStorage.setItem('username', resp.Username);
      this.getUser();
    })
  }

  /**
   * Method to delete user profile.
   */
  deleteUser(): void {
    if (
      confirm(
        'Are you sure you want to delete your accaunt?'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfuly deleted your account.',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((resp) => {
        localStorage.clear();
      })
    }
  }
}
