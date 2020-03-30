import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-grid',
  templateUrl: './event-grid.component.html',
  styleUrls: ['./event-grid.component.css']
})



export class EventGridComponent {
  
  title = 'eventy';
  searchText;
 events = [
    { id: 1, name: 'Camping', place: 'India', Date: '10-11-2022', price: '80', discreption: 'aladan ya gazma  discreption sa8rouna tji lena tssaref', creator: 'kazdar' ,creator_dis: 'UI UX Designer', rating:'4.8', view:'20'},
    { id: 2, name: 'Camping', place: 'India', Date: '10-11-2022', price: '80', discreption: 'aladan ya gazma  discreption sa8rouna tji lena tssaref', creator: 'kazdar' ,creator_dis: 'UI UX Designer', rating:'4.8', view:'20'},
    { id: 3, name: 'Camping', place: 'India', Date: '10-11-2022', price: '80', discreption: 'aladan ya gazma  discreption sa8rouna tji lena tssaref', creator: 'kazdar' ,creator_dis: 'UI UX Designer', rating:'4.8', view:'20'},
    { id: 4, name: 'Camping', place: 'India', Date: '10-11-2022', price: '80', discreption: 'aladan ya gazma  discreption sa8rouna tji lena tssaref', creator: 'kazdar' ,creator_dis: 'UI UX Designer', rating:'4.8', view:'20'},
    { id: 5, name: 'Camping', place: 'India', Date: '10-11-2022', price: '80', discreption: 'aladan ya gazma  discreption sa8rouna tji lena tssaref', creator: 'kazdar' ,creator_dis: 'UI UX Designer', rating:'4.8', view:'20'},
    { id: 6, name: 'Camping', place: 'India', Date: '10-11-2022', price: '80', discreption: 'aladan ya gazma  discreption sa8rouna tji lena tssaref', creator: 'kazdar' ,creator_dis: 'UI UX Designer', rating:'4.8', view:'20'},
    { id: 7, name: 'Camping', place: 'India', Date: '10-11-2022', price: '80', discreption: 'aladan ya gazma  discreption sa8rouna tji lena tssaref', creator: 'kazdar' ,creator_dis: 'UI UX Designer', rating:'4.8', view:'20'},
    { id: 8, name: 'Camping', place: 'India', Date: '10-11-2022', price: '80', discreption: 'aladan ya gazma  discreption sa8rouna tji lena tssaref', creator: 'kazdar' ,creator_dis: 'UI UX Designer', rating:'4.8', view:'20'},
    { id: 9, name: 'Camping', place: 'India', Date: '10-11-2022', price: '80', discreption: 'aladan ya gazma  discreption sa8rouna tji lena tssaref', creator: 'kazdar' ,creator_dis: 'UI UX Designer', rating:'4.8', view:'20'},
  ];
  
}
