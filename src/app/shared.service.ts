import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Place} from "./models/Place";
import {Booking} from "./models/Booking";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedPlaceSource = new BehaviorSubject<Place | null>(null);
  selectedPlace$ = this.selectedPlaceSource.asObservable();

  private selectedSearchSource = new BehaviorSubject<Booking | null>(null);
  selectedSearchSource$ = this.selectedSearchSource.asObservable();

  selectPlace(place: Place) {
    this.selectedPlaceSource.next(place);
  }

  selectSearch(search: Booking) {
    this.selectedSearchSource.next(search);
  }
}
