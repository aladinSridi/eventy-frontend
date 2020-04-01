import { Router, NavigationEnd } from '@angular/router';
import { EventService } from './../event.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-event-grid',
  templateUrl: './event-grid.component.html',
  styleUrls: ['./event-grid.component.css']
})



export class EventGridComponent {

  title = 'Eventy';
  events = []
  searchText;

  constructor(private eventService: EventService, private router:Router) {
    this.getAllEvents();

    var elts = document.getElementsByName('ellipsable');
    var i;
    for (i = 0; i < elts.length; i++) {
        var wordArray = elts[i].innerHTML.split(' ');
        while(elts[i].scrollHeight > elts[i].offsetHeight) {
            wordArray.pop();
            elts[i].innerHTML = wordArray.join(' ') + '...';
        }
    }
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

  getAllEvents() {
    this.eventService.getEvents().subscribe(events => {
      for (let i = 0; i < events['length']; i++) {
        this.events.push(events[i]);
      }
    });
  }
}
