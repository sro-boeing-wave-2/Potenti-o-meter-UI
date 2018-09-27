import { Component, OnInit } from '@angular/core';
import {SignUpService} from '../sign-up.service';
import {Domain} from '../Domain';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {

  constructor(private signupservice: SignUpService, private router: Router ) {

  }
  Domains :Domain[];

  public UserData;
  ngOnInit() {
    this.signupservice.getName().subscribe(result => {
      this.UserData = result.json();
    });
  }

  startQuiz(){
    this.router.navigate(['start',this.UserData.UserID,"Java"]);
  }

}
