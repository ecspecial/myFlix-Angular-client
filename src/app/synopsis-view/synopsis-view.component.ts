import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying the synopsis view of a movie.
 */
@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent {

  /**
   * @param data - Injected data containing details about a movie.
   * @param data.Title - The title of the movie.
   * @param data.Director - The director of the movie.
   * @param data.Genre - The genre of the movie.
   * @param data.Description - The description of the movie.
   * @param data.Image - The image URL of the movie.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Director: string;
      Genre: string;
      Description: string;
      Image: string;
    }
  ) {}
}
