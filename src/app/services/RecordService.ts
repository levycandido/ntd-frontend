import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {Record} from "../entity/Record";

const BASE_URL = environment.apiUrl + "/v1/records" ;

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  calculateOperation(record: Record): Observable<Record> {
    return this.http.post<Record>(`${BASE_URL}`, record);
  }

  getRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(BASE_URL);
  }

  deleteRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }
}
