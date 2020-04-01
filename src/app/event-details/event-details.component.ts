import { CookieService } from 'ngx-cookie-service';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  public event;

  constructor(private cookieServie: CookieService, private eventService: EventService, private _Activatedroute:ActivatedRoute, private router:Router) {
    this._Activatedroute.paramMap.subscribe(params => {
      if(params.get('id') != null){
        this.eventService.getEventById(params.get('id')).subscribe(res => {
          this.event = res

          /* Active Reconnaissance */
          let cookiesExpirationTime = new Date(); cookiesExpirationTime.setDate( cookiesExpirationTime.getDate() + 30 );

          /** Extracting Keywords and Keywords Cookie **/
          var commonWords = ['i','a','about','an','and','are','as','at','be','by','com','de','en','for','from','how','in','is','it','la','of','on','or','that','the','this','to','was','what','when','where','who','will','with','und','the','www'];
          var text = this.event.title;
          text = text.toLowerCase();
          text = text.replace(/[^\w\d ]/g, '');
          var result = text.split(' ');
          result = result.filter(function (word) {return commonWords.indexOf(word) === -1;});
          var newKeywordsArray = result.filter((v, i, a) => a.indexOf(v) === i);

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
            newCookie = newKeywordsArray.join(":")
            this.cookieServie.set('filtredKeywords', newCookie, cookiesExpirationTime, '/');
          }


          if(this.cookieServie.get('filtredCategories')){
            var isNew = true;
            var filtredCategoriessArray = this.cookieServie.get('filtredCategories').split(':');
            filtredCategoriessArray.forEach(element => {
              if(element == this.event.category) {
                isNew = false
              }
            });

            if(isNew) {
              this.cookieServie.set('filtredCategories', this.cookieServie.get('filtredCategories')+":"+this.event.category, cookiesExpirationTime, '/');
            }
          } else {
            this.cookieServie.set('filtredCategories', this.event.category, cookiesExpirationTime, '/');
          }
          /* END -- Active Reconnaissance*/

        })
      }
    });
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
