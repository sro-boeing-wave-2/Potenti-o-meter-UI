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
  public url;

  ngOnInit() {
    this.signupservice.getName().subscribe(result => {
      this.UserData = result.json();
      this.id = result.json().UserID;
      this.url = "http://13.126.26.172/inferencer/?userid=" + this.id;
    });
  }

  receiveMessage($event){
    this.display = $event.render;
    this.domain = $event.domains;
  }

  sendMessage($event){
    this.display = $event;
  }
}
