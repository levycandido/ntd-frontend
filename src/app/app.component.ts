import {Component, OnInit} from '@angular/core';
import * as DarkReader from "darkreader";
import {UserInfoService} from "./services/UserNameService";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  darkReader: any = DarkReader;
  constructor(private userInfoService: UserInfoService,
              private authService: AuthService ) {
    this.darkReader.enable({
      brightness: 100,
      contrast: 90,
      sepia: 10
    });
  }

  title = 'NTD Software Challenge';

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

}
