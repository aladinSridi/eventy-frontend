import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';


const routes: Routes = [{path:'', component:LandingComponent}]; /*  hadhi bech trod router y pointi 3la landing bech tet7alek page landing */



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
