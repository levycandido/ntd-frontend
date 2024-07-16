import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Record} from "../models/Record";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private apiUrl = 'http://localhost:8080/v1/records';

  constructor(private http: HttpClient) { }

  calculateOperation(record: Record): Observable<Record> {
    return this.http.post<Record>(`${this.apiUrl}`, record);
  }
}
