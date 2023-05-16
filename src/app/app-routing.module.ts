import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * The main routes of the application.
 */
const routes: Routes = [];

/**
 * The main routing module for the application.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
