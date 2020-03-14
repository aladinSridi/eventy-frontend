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
}
