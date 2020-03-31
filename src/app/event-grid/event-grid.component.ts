import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-grid',
  templateUrl: './event-grid.component.html',
  styleUrls: ['./event-grid.component.css']
})



export class EventGridComponent {

  title = 'Eventy';
  events = []
  searchText;

  constructor(private eventService: EventService) {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getEvents().subscribe(events => {
      for (let i = 0; i < events['length']; i++) {
        this.events.push(events[i]);
      }
    });
  }
}
