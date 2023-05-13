import { Component } from '@angular/core';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  isNavbarOpen = false;
  isSmallScreen = false;

  constructor(public router: Router, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  allMovies(): void{
    this.router.navigate(['movies']);
  }

  profile(): void{
    this.router.navigate(['profile']);
  }

  logout(): void{
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  toggleNavbar(): void{
    this.isNavbarOpen = !this.isNavbarOpen;
  } 
}
