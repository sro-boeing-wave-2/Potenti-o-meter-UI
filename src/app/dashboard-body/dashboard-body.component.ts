import { Component, OnInit, Input } from '@angular/core';
import {SignUpService} from '../sign-up.service';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
declare var require: any;
var data = require('../../assets/data/domain.json');

@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {

  constructor(private signupservice: SignUpService, private router: Router, private doaminservice: DashboardService ) {
  }
  @Input() DomainData;
  public UserData;
  ngOnInit() {
    this.signupservice.getName().subscribe(result => {
      this.UserData = result.json();
    });
    console.log(this.domainstuff);
  }

  startQuiz(item){
    this.router.navigate(['start',this.UserData.UserID,item]);
  }

  domainstuff = [
    {"color":"blue","tagline":"Know the reason behind every fiction","icon":"nature_people"},
    {"color":"pink","tagline":"Java: write once, run away!","icon":"code"},
    {"color":"red","tagline":"Know the reason behind every fiction","icon":"nature_people"},
  ]

}
