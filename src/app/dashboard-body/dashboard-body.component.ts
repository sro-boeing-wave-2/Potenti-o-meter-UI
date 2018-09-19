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

  ngOnInit() {
   this.Domains= [
      {name: 'C#'},
      {name : 'Java'},
      {name: 'Algorithms'},
      {name: 'Python'},
  ];
  console.log(this.Domains);
  }

  startQuiz(){
    this.router.navigate(['start',1,"Java"]);
  }

}
