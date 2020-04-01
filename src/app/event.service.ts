import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  uri = 'http://localhost:2222';

  constructor(private http: HttpClient) {}

  getRecommendedEvents(filter) {
    return this.http.post(`${this.uri}/event/recommended`, filter);
  }

  getEvents() {
    return this.http.get(`${this.uri}/event/all`);
  }


  getEventById(id) {
    return this.http.get(`${this.uri}/event/${id}`);
  }


  getEventLatest() {
    return this.http.get(`${this.uri}/event/latest`);
  }


  getEventTrending() {
    return this.http.get(`${this.uri}/event/trending`);
  }


  getEventUpComing() {
    return this.http.get(`${this.uri}/event/upcoming`);
  }


  getEventClosest(country) {
    return this.http.get(`${this.uri}/event/closest/${country}`);
  }


  getEventRandom() {
    return this.http.get(`${this.uri}/event/random`);
  }


  createEvent(event) {
    return this.http.post(`${this.uri}/event/create`, event);
  }


  updateEvent(id, event) {
    return this.http.put(`${this.uri}/event/${id}/update`, event);
  }


  deleteEvent(id) {
    return this.http.delete(`${this.uri}/event/${id}/delete`);
  }

  searchEvents(filter) {
    return this.http.post(`${this.uri}/event/search`, filter);
  }
}
