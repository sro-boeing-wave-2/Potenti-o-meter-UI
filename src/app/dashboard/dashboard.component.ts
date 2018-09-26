import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private cookieService: CookieService) { }
  cookieValue = ''

  ngOnInit() {
    this.cookieValue = this.cookieService.get('UserLoginAPItoken');
    console.log(this.cookieValue);
  }

}
