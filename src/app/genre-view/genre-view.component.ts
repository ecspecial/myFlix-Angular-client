import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying genre view.
 */
@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent {
  
   /**
   * @param {Object} data - An object that contains genre details.
   * @param {string} data.Name - The name of the genre.
   * @param {string} data.Description - The description of the genre.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: String,
      Description: String,
    }
  ) {}
}
