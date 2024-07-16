import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Person} from "../models/Person";
import {environment} from "../../environments/environment.prod";

const BASE_URL = environment.apiUrl + '/v1/persons';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  findByEmail(email: string): Observable<Person> {
    const url = `${BASE_URL}?email=${email}`;
    return this.http.get<Person>(url);
  }
}
