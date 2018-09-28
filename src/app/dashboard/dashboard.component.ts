import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private domainservice: DashboardService) { }

  public Domains= [];
  ngOnInit() {
    this.domainservice.getQuizDomains().subscribe(result => {;
      this.Domains.push(...result.json());
    })
  }

}
