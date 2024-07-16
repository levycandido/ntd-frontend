import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {User} from "../models/User";

const BASE_URL = environment.apiUrl + '/v1/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findByEmail(user: User): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = `${BASE_URL}`;
    return this.http.post<User>(url, user);
  }
}
