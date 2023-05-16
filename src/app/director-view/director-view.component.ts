import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * DirectorViewComponent is responsible for rendering the details of a specific director.
 */
@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent {
  
  /**
   * @param {Object} data - An object that contains director's details.
   * @param {string} data.Name - The name of the director.
   * @param {string} data.Bio - The biography of the director.
   * @param {string} data.Birth - The birth date of the director.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birth: string,
    }
  ) {}
}
