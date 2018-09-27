import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../sign-up.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private signupservice: SignUpService) { }

  public UserData;

  ngOnInit() {
    this.signupservice.getName().subscribe(result => {
      this.UserData = result.json();
    });
  }

}
