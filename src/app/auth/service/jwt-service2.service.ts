import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment.prod";
import {User} from "../../models/User";

const BASE_URL = environment.apiUrl + "/" ;

@Injectable({
  providedIn: 'root'
})
export class JwtService2 {

  constructor(private http: HttpClient) { }

  addUser(signupRequest: User): Observable<User> {
    return this.http.post<User>(BASE_URL + 'signup', signupRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest)
  }

}
