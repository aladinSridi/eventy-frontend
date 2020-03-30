import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  public event;

  constructor(private eventService: EventService, private _Activatedroute:ActivatedRoute, private router:Router) {
    this._Activatedroute.paramMap.subscribe(params => {
      this.eventService.getEventById(params.get('id')).subscribe(res => {
        this.event = res
      })
    });
  }

  ngOnInit(): void {}



  relodet(){
    var i=0;
    var state = history.state || {};

    var reloadCount = state.reloadCount || 0;
    if(reloadCount>=3){
      state.reloadCount=0;
    }
     if (performance.navigation.type === 1) { // Reload
    state.reloadCount = ++reloadCount;
    history.replaceState(state, null, document.URL);}
   else if (reloadCount) {
    delete state.reloadCount;
    reloadCount = 0;
    history.replaceState(state, null, document.URL);
  }
  if (reloadCount >=1) {
    // Now, do whatever you want...
   i=2;
   }

    if(i==0){
    location.reload();
    i=1;
  }

}
}
