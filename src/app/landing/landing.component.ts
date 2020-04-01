import { CookieService } from 'ngx-cookie-service';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private cookieServie: CookieService, private eventService: EventService, private router:Router) {
    this.getNeededEvents();
  }

  ngOnInit() {
    console.log('we here')
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
  }

  /* Start -- Fetching Event */
  public trandingEvents = new Array();
  public upComingEvents = new Array();
  public upComingEvent = {
    'daysUntil' : 0,
    'hoursUntil' : 0,
    'minutesUntil' : 0,
    'secondsUntil' : 0
  };
  public recommendedEvents = new Array();
  public modPopUp = "none";
  public missedPopUp = "none";
  public Difference_In_Days = 0;
  getNeededEvents() {

    /* Getting The 3 most  Popular Events */
    this.eventService.getEventTrending().subscribe(events => {
      for (let i = 0; i < events['length']; i++) {
        this.trandingEvents.push(events[i]);
      }
    });

    /* Getting Closest Upcoming Event */
    this.eventService.getEventUpComing().subscribe((event) => {
      this.upComingEvents.push(event[0]);

      var now_date = (new Date()).getTime();
      var date = new Date(this.upComingEvents[0].date);
      var event_date = date.getTime();

      var delta = Math.abs(event_date - now_date) / 1000;
      var daysUntil = Math.floor(delta / 86400);
      delta -= daysUntil * 86400;
      var hoursUntil = Math.floor(delta / 3600) % 24;
      delta -= hoursUntil * 3600;
      var minutesUntil = Math.floor(delta / 60) % 60;
      delta -= minutesUntil * 60;
      var secondsUntil = Math.floor(delta % 60);

      this.upComingEvent['daysUntil'] = daysUntil;
      this.upComingEvent['hoursUntil'] = hoursUntil;
      this.upComingEvent['minutesUntil'] = minutesUntil;
      this.upComingEvent['secondsUntil'] = secondsUntil;
    });


    /* Getting Recommanded Events */
    /**
     * Fetched Passive Cookies:
     * - locOfVisits
     * - numberOfVisits
     * - datesOfVisits
     * - daysOfVisits
     * - hoursOfVisits
     * - browser
     * - desktop
     * - gameDevices
     * - mobile
     *
     * Fetched Active Cookies:
     * - filtredKeywords
     * - filtredCategories
     * - filtredLocations
     * - filtredCosts
     * - filtredDates
     */
    var userFilter = {}

    /* Back Specialization */
    if(this.cookieServie.get('locOfVisits')){
      userFilter["locOfVisits"] = this.cookieServie.get('locOfVisits');
    }

    if(this.cookieServie.get('daysOfVisits')){
      userFilter["daysOfVisits"] = this.cookieServie.get('daysOfVisits');
    }

    if(this.cookieServie.get('hoursOfVisits')){
      userFilter["hoursOfVisits"] = this.cookieServie.get('hoursOfVisits');
    }

    if(this.cookieServie.get('desktop')){
      userFilter["desktop"] = this.cookieServie.get('desktop');
    }

    if(this.cookieServie.get('gameDevices')){
      userFilter["gameDevices"] = this.cookieServie.get('gameDevices');
    }

    if(this.cookieServie.get('mobile')){
      userFilter["mobile"] = this.cookieServie.get('mobile');
    }

    if(this.cookieServie.get('filtredKeywords')){
      userFilter["filtredKeywords"] = this.cookieServie.get('filtredKeywords');
    }

    if(this.cookieServie.get('filtredCategories')){
      userFilter["filtredCategories"] = this.cookieServie.get('filtredCategories');
    }

    if(this.cookieServie.get('filtredLocations')){
      userFilter["filtredLocations"] = this.cookieServie.get('filtredLocations');
    }


    /* Front Specialization */
    if(this.cookieServie.get('numberOfVisits')){
      userFilter["numberOfVisits"] = this.cookieServie.get('numberOfVisits');
    }

    if(parseInt(userFilter["numberOfVisits"]) > 10) {                                                         // <-- Change this to 100
      this.modPopUp = "bloc"
    }

    if(this.cookieServie.get('datesOfVisits')){
      userFilter["datesOfVisits"] = this.cookieServie.get('datesOfVisits');
    }
    var oldDate = new Date(userFilter["datesOfVisits"].split(":")[0]);
    var newDate = new Date(userFilter["datesOfVisits"].split(":")[1]);
    var Difference_In_Time = newDate.getTime() - oldDate.getTime();
    this.Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    if(this.Difference_In_Days > 0) {                                                                         // <-- Change this to 3
      this.missedPopUp = "bloc"
    }



    /* Not used in this Algorithm */
    if(this.cookieServie.get('browser')){
      userFilter["browser"] = this.cookieServie.get('browser');
    }

    if(this.cookieServie.get('filtredCosts')){
      userFilter["filtredCosts"] = this.cookieServie.get('filtredCosts');
    }

    if(this.cookieServie.get('filtredDates')){
      userFilter["filtredDates"] = this.cookieServie.get('filtredDates');
    }


    this.eventService.getRecommendedEvents(userFilter).subscribe(events => {
      console.log("bb")
      if(events['length'] >= 3) {
        for (let i = 0; i < 3; i++) {
          this.recommendedEvents.push(events[i]);
        }
      } else {
        for (let i = 0; i < events['length']; i++) {
          this.recommendedEvents.push(events[i]);
        }

        var fillTheBlanks = 3 - events['length'];

        for (let i = 0; i < fillTheBlanks; i++) {
          this.recommendedEvents.push(this.trandingEvents[i]);
        }
      }
    });

  }
  /* End -- Fetching */


  hideee()  {
    var hidee = document.getElementById("hide");
    hidee.style.display="none"
  }


  search()  {
    var showw = document.getElementById("event_grid")
    var hid = document.getElementById("hide_all")
    var welc = document.getElementById("welcom");
    var welc2 = document.getElementById("welcom2");
    var felterr = document.getElementById("filter-me");

    showw.style.display="block"
    felterr.style.display="block"
    welc.style.display="none"
    welc2.style.display="none"
    hid.style.display="none"


    /* Active Reconnaissance */
    let cookiesExpirationTime = new Date(); cookiesExpirationTime.setDate( cookiesExpirationTime.getDate() + 30 );
    var newlocation = (<HTMLInputElement>document.getElementById("s-location")).value;
    var newKeywords = (<HTMLInputElement>document.getElementById("s-keyword")).value;
    var newKeywordsArray = newKeywords.split(' ');

    if(this.cookieServie.get('filtredKeywords')){
      var filtredKeywordsArray = this.cookieServie.get('filtredKeywords').split(':');
      newKeywordsArray.forEach(element => {
        if(!(filtredKeywordsArray.includes(element))){
          filtredKeywordsArray.push(element)
        }
      });

      var newCookie = filtredKeywordsArray.join(":")
      this.cookieServie.set('filtredKeywords', newCookie, cookiesExpirationTime, '/');

    } else {
      var newCookie = newKeywordsArray.join(":")
      this.cookieServie.set('filtredKeywords', newCookie, cookiesExpirationTime, '/');
    }


    if(this.cookieServie.get('filtredLocations')){
      var isNew = true;
      var filtredLocationsArray = this.cookieServie.get('filtredLocations').split(':');
      filtredLocationsArray.forEach(element => {
        if(element == newlocation) {
          isNew = false
        }
      });

      if(isNew) {
        this.cookieServie.set('filtredLocations', this.cookieServie.get('filtredLocations')+":"+newlocation, cookiesExpirationTime, '/');
      }
    } else {
      this.cookieServie.set('filtredLocations', newlocation, cookiesExpirationTime, '/');
    }
    /* END -- Active Reconnaissance*/
  }

  details()  {
    var ed = document.getElementById("event-details");
    var eg = document.getElementById("event-Grid");
    ed.style.display="block"
    eg.style.display="none"
  }

}
