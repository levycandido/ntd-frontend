import { Component } from '@angular/core';
import * as DarkReader from "darkreader";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  darkReader: any = DarkReader;
  constructor() {
    this.darkReader.enable({
      brightness: 100,
      contrast: 90,
      sepia: 10
    });
  }
  title = 'NTD Software Challenge';
}
