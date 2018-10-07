import { Component, OnInit, Input } from '@angular/core';
import { SignUpService } from '../sign-up.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() DomainData;
  public display= true;
  public domain;

  constructor(private signupservice: SignUpService) { }

  public UserData = [];
  public id;

  ngOnInit() {
    this.signupservice.getName().subscribe(result => {
      this.UserData = result.json();
      console.log("This is result " + result.json());
      console.log("This is Userdata "+ this.UserData);
      // this.id = this.UserData.userID;
    });
  }

  receiveMessage($event){
    this.display = $event.render;
    this.domain = $event.domains;
  }

  sendMessage($event){
    this.display = $event;
  }

  inference() {
    this.id = this.UserData
    window.location.href="https://www.google.com";
  }
}
