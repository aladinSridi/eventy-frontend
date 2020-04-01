import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Eventy';

  constructor(private cookieServie: CookieService, private http:HttpClient) {}

  /* Passive Reconnaissance - Number of Visits, Dates of Visits, Days, Hours, Locations of Visits, Browser, Desktop, Mobile, GameDevice*/
  userBrowserInfo = {};
  getPassiveInfo(event){
    let cookiesExpirationTime = new Date(); cookiesExpirationTime.setDate( cookiesExpirationTime.getDate() + 30 );

    /* Location Cookie */
    let loc = ""
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.http.get("https://ipinfo.io/"+res.ip+"/json?token=fafe55d9a9bc55").subscribe(data => {
        loc = (data['timezone']).toString().split("/")[1];
        this.userBrowserInfo["locOfVisits"] = loc;

        if(this.cookieServie.get('locOfVisits')){
          let isNewLocation = true;
          let locOfVisitsArray = this.cookieServie.get('locOfVisits').split(':');
          locOfVisitsArray.forEach(element => {
            if(element == this.userBrowserInfo["locOfVisits"]){
              isNewLocation = false;
            }
          });
          if(isNewLocation) {
            this.cookieServie.set('locOfVisits', this.cookieServie.get('locOfVisits')+":"+this.userBrowserInfo["locOfVisits"], cookiesExpirationTime, '/');
            this.userBrowserInfo["locOfVisits"] = this.cookieServie.get('locOfVisits');
          } else {
            this.userBrowserInfo["locOfVisits"] = this.cookieServie.get('locOfVisits');
          }
        } else {
          this.cookieServie.set('locOfVisits', this.userBrowserInfo["locOfVisits"], cookiesExpirationTime, '/');
        }
      });
    });



    /* Time Cookies */
    let date = new Date();
    this.userBrowserInfo["datesOfVisits"] = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    this.userBrowserInfo["daysOfVisits"] = date.getDay();
    this.userBrowserInfo["hoursOfVisits"] = date.getHours();
    if(date.getMinutes() > 40) {this.userBrowserInfo["hoursOfVisits"] = this.userBrowserInfo["hoursOfVisits"] + 1;}


    if(this.cookieServie.get('numberOfVisits')){
      this.cookieServie.set('numberOfVisits', (parseInt(this.cookieServie.get('numberOfVisits'))+1).toString(), cookiesExpirationTime, '/');
      this.userBrowserInfo["numberOfVisits"] = this.cookieServie.get('numberOfVisits');
    } else {
      this.cookieServie.set('numberOfVisits', '1', cookiesExpirationTime, '/');
      this.userBrowserInfo["numberOfVisits"] = this.cookieServie.get('numberOfVisits');
    }


    if(this.cookieServie.get('datesOfVisits')){
      let isNewDate = true;
      let datesArray = this.cookieServie.get('datesOfVisits').split(':');
      let lastDate;
      let newDateOfVisit = this.userBrowserInfo["datesOfVisits"];

      datesArray.forEach(function(element, index, array) {
        if(element == newDateOfVisit){
          isNewDate = false;
        }

        if (index === array.length - 1){
          lastDate = element;
        }
      });

      if(isNewDate) {
        this.cookieServie.set('datesOfVisits', lastDate+":"+this.userBrowserInfo["datesOfVisits"], cookiesExpirationTime);
        this.userBrowserInfo["datesOfVisits"] = this.cookieServie.get('datesOfVisits');
      } else {
        this.userBrowserInfo["datesOfVisits"] = this.cookieServie.get('datesOfVisits');
      }
    } else {
      this.cookieServie.set('datesOfVisits', this.userBrowserInfo["datesOfVisits"], cookiesExpirationTime, '/');
    }


    if(this.cookieServie.get('daysOfVisits')){
      this.cookieServie.set('daysOfVisits', this.cookieServie.get('daysOfVisits')+":"+this.userBrowserInfo["daysOfVisits"].toString(), cookiesExpirationTime, '/');
      this.userBrowserInfo["daysOfVisits"] = this.cookieServie.get('daysOfVisits');
    } else {
      this.cookieServie.set('daysOfVisits', this.userBrowserInfo["daysOfVisits"], cookiesExpirationTime, '/');
    }


    if(this.cookieServie.get('hoursOfVisits')){
      this.cookieServie.set('hoursOfVisits', this.cookieServie.get('hoursOfVisits')+":"+this.userBrowserInfo["hoursOfVisits"].toString(), cookiesExpirationTime, '/');
      this.userBrowserInfo["hoursOfVisits"] = this.cookieServie.get('hoursOfVisits');
    } else {
      this.cookieServie.set('hoursOfVisits', this.userBrowserInfo["hoursOfVisits"], cookiesExpirationTime, '/');
    }






    /* Hardware And Software Cookies - If these change new cookies will be created*/
    this.userBrowserInfo["browser"] = event.browser;
    if(event.game_device.state){this.userBrowserInfo["gameDevices"] = event.game_device.name;}
    if(event.desktop.state){this.userBrowserInfo["desktop"] = event.desktop.name;}
    if(event.device == "mobile"){
      if(event.browser == "ie") this.userBrowserInfo["mobile"] = "Windows Phone";
      else if(event.browser == "safari"){this.userBrowserInfo["mobile"] = "Iphone";}
      else {this.userBrowserInfo["mobile"] = "Android";}
    }


    if(this.userBrowserInfo["browser"]){
      this.cookieServie.set('browser', this.userBrowserInfo["browser"], cookiesExpirationTime, '/');
    }

    if(this.userBrowserInfo["desktop"]){
      this.cookieServie.set('desktop', this.userBrowserInfo["desktop"], cookiesExpirationTime, '/');
    }

    if(this.userBrowserInfo["gameDevices"]){
      this.cookieServie.set('gameDevices', this.userBrowserInfo["gameDevices"], cookiesExpirationTime, '/');
    }

    if(this.userBrowserInfo["mobile"]){
      this.cookieServie.set('mobile', this.userBrowserInfo["mobile"], cookiesExpirationTime, '/');
    }
  }
  /* END -- Passive Reconnaissance */

}
