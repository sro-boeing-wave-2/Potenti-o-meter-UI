import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private domainservice: DashboardService) { }

  ngOnInit() {
    this.domainservice.getQuizDomains().subscribe(result => {
      console.log(result.json());
    })
  }

}
