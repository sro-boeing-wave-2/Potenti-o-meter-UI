import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserSignUpComponent } from '../user-sign-up/user-sign-up.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }
  public isActive:boolean = false;
  ngOnInit() {
  }

  onLoginNotify():void {
    var disabled = !this.isActive;
    let dialogRef = this.dialog.open(UserSignUpComponent, {panelClass: 'full-width-dialog',
    data :{disabled},
    });
  }
  onSignInNotify():void {
    var disabled = this.isActive;
    let dialog = this.dialog.open(UserSignUpComponent, {panelClass: 'full-width-dialog',
    data :{disabled}
    });
  }
}
