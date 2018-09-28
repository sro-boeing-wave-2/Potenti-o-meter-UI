import { Component, OnInit } from '@angular/core';
import {SignUpService} from '../sign-up.service';
import {Domain} from '../Domain';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {

  constructor(private signupservice: SignUpService, private router: Router, private doaminservice: DashboardService ) {

  }
  public Domains= [];
  public UserData;
  ngOnInit() {
    this.signupservice.getName().subscribe(result => {
      this.UserData = result.json();
    });
    this.doaminservice.getQuizDomains().subscribe(result => {
      console.log(result.statusText);
    })
    this.doaminservice.getDomainDetails().subscribe(result => {
      console.log(result.statusText);
    }
      )
  }

  startQuiz(){
    this.router.navigate(['start',this.UserData.UserID,"Java"]);
  }

}
