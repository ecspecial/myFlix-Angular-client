import { Component } from '@angular/core';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

/**
 * Component for the navigation bar.
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  /**
   * Boolean value to determine if navbar is open.
   */
  isNavbarOpen = false;

  /**
   * Boolean value to determine if the screen is small.
   */
  isSmallScreen = false;

  /**
   * @param router - Service for navigation between pages.
   * @param breakpointObserver - Service for reacting to media query events.
   */
  constructor(public router: Router, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  /**
   * Method to navigate to all movies.
   */
  allMovies(): void{
    this.router.navigate(['movies']);
  }

  /**
   * Method to navigate to profile.
   */
  profile(): void{
    this.router.navigate(['profile']);
  }

  /**
   * Method to logout and navigate to welcome page.
   */
  logout(): void{
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  /**
   * Method to toggle the navigation bar.
   */
  toggleNavbar(): void{
    this.isNavbarOpen = !this.isNavbarOpen;
  } 
}
