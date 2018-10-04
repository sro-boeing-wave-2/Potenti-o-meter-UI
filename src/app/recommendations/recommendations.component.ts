import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  constructor(private router: Router, private dashboardsservice: DashboardService) { }
  @Input() domain;
  @Input() UserData;
  @Output() dashbaord = new EventEmitter();
  ngOnInit() {
    this.dashboardsservice.getRecommendations(this.UserData.UserID,this.domain).subscribe(result =>
      console.log(result.status));
  }

  startQuiz(){
    this.router.navigate(['start',this.UserData.UserID,this.domain]);
  }

  result(){
    this.router.navigate(['quizresult',this.UserData.UserID,this.domain]);
  }

  dashboard(){
    this.dashbaord.emit(true);
  }
}
