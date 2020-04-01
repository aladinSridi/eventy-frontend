import { UserService } from './user.service';
import { EventService } from './event.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventGridComponent } from './event-grid/event-grid.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ResponsiveModule } from 'ngx-responsive'
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    EventDetailsComponent,
    FooterComponent,
    NavbarComponent,
    EventGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ResponsiveModule.forRoot(),

    RouterModule.forRoot([ /* nassen3ou path lel event-details bech nssahlou l 5edma */
      {path:'details/:id',component:EventDetailsComponent},
      {path:'home',component:LandingComponent},
      {path:'events',component:EventGridComponent},
    ])
  ],
  bootstrap: [AppComponent],
  providers: [EventService, UserService, CookieService],
})
export class AppModule { }
