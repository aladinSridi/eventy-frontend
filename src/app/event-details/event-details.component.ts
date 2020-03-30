import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
   
  }



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
