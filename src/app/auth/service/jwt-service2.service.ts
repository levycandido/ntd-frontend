import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment.prod";
import {UserDTO} from "../../DTO/UserDTO";

const BASE_URL = environment.apiUrl + "/" ;

@Injectable({
  providedIn: 'root'
})
export class JwtService2 {

  constructor(private http: HttpClient) { }

  addUser(signupRequest: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(BASE_URL + 'signup', signupRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest)
  }

}
