import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
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
