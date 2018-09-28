import { Component, OnInit, Input } from '@angular/core';
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
  @Input() DomainData;
  public UserData;
  ngOnInit() {
    this.signupservice.getName().subscribe(result => {
      this.UserData = result.json();
    });
    console.log(this.DomainData);
  }

  startQuiz(){
    this.router.navigate(['start',this.UserData.UserID,"Java"]);
  }

}
