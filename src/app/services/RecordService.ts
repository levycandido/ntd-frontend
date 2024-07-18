import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Record} from "../models/Record";
import {environment} from "../../environments/environment.prod";

const BASE_URL = environment.apiUrl + "/v1/records" ;

@Injectable({
  providedIn: 'root'
})
export class RecordService {


  constructor(private http: HttpClient) { }

  calculateOperation(record: Record): Observable<Record> {
    return this.http.post<Record>(`${BASE_URL}`, record);
  }
}
