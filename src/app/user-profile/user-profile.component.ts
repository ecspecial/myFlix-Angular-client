import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];

  @Input() updatedUser = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = this.user.Birthday;
      return this.user;
    })
  }

  updateProfile(): void {
    this.fetchApiData.updateUser(this.updatedUser).subscribe((resp) => {
      this.snackBar.open('User profile successfuly updated', 'OK', {
        duration: 2000,
      });
      localStorage.setItem('username', resp.Username);
      this.getUser();
    })
  }

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
