import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private eventService: EventService) {
    this.getNeededEvents();
  }

  ngOnInit(): void {
  }

  /* Start -- Fetching 3 Popular Events and an Upcoming Event */
  public trandingEvents = new Array();
  public latestEvent;
  public upComingEvent;
  public pic;
  getNeededEvents() {

    this.eventService.getEventTrending().subscribe(events => {
      for (let i = 0; i < events['length']; i++) {
        this.trandingEvents.push(events[i]);
      }
    });

    this.eventService.getEventLatest().subscribe((event) => {
      this.latestEvent = event;
    });

    this.eventService.getEventUpComing().subscribe((event) => {
      this.upComingEvent = event[0];

      var now_date = (new Date()).getTime();
      var date = new Date(this.upComingEvent.date);
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
  }
  /* End -- Fetching */

  hideee()
  {
    var hidee = document.getElementById("hide");


   hidee.style.display="none"

  }
  search()
  {
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
  }

  details()
  {
    var ed = document.getElementById("event-details");
    var eg = document.getElementById("event-Grid");



  ed.style.display="block"

  eg.style.display="none"

  }

}
