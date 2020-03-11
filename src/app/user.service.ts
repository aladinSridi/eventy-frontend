import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:2222';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.uri}/user/all`);
  }


  getUserById(id) {
    return this.http.get(`${this.uri}/user/id/${id}`);
  }


  getUserByUsername(username) {
    return this.http.get(`${this.uri}/user/username/${username}`);
  }


  getUserByUsernameAndPassword(username, password) {
    return this.http.get(`${this.uri}/user/membership/${username}/${password}`);
  }


  createUser(user) {
    return this.http.post(`${this.uri}/user/create`, user);
  }


  updateUser(id, user) {
    return this.http.put(`${this.uri}/user/${id}/update`, user);
  }


  deleteUser(id) {
    return this.http.delete(`${this.uri}/user/${id}/delete`);
  }

}
