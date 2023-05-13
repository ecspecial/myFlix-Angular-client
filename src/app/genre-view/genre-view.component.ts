import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: String,
      Description: String,
    }
  ) {}
}
