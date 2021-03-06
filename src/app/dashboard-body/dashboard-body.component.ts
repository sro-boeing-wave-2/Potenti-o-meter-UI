import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  @Output() recommend = new EventEmitter<any>();
  //uniqueItems = Array.from(new Set(this.DomainData))
  ngOnInit() {
    this.signupservice.getName().subscribe(result => {
      this.UserData = result.json();
    });
  }

  startQuiz(item){
    this.router.navigate(['start',this.UserData.UserID,item]);
  }

  result(item){
    this.router.navigate(['quizresult',this.UserData.UserID,item]);
  }

  recommendations(item){
    this.recommend.emit({render:false,domains:item});
  }

  domainstuff = [
    {"color":"pink","tagline":"Know the reason behind every fiction","icon":"nature_people"},
    {"color":"blue","tagline":"Nutritious mind candy","exposure_zero":"code"},
    {"color":"red","tagline":"Java: write once, run away!","icon":"code"},
    {"color":"green","tagline":"You had me at Delegate","icon":"code"},
    {"color":"black","tagline":"Today a reader, tomorrow a leader.","icon":"subject"},
  ]

}
