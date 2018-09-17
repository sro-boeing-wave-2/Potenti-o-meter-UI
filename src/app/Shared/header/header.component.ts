import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { UserSignUpComponent } from '../../user-sign-up/user-sign-up.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  @Output() notifyLogIn: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifySignIn: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {
  }

  LogIn() {
    this.notifyLogIn.emit('Log in button clicked');
    //let dialog = this.dialog.open(UserLoginComponent,{ width:'600px',panelClass: 'my-centered-dialog' });

  }
  SignUp() {
    this.notifySignIn.emit('Sign in button clicked');
    //let dialog = this.dialog.open(UserSignUpComponent,{ width:'600px',panelClass: 'my-centered-dialog' });

  }
}
