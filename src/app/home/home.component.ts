import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
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
  public signup:boolean = false;
  dialogRef: MatDialogRef<UserSignUpComponent>;
  public static onClose:boolean;
  ngOnInit() {
  }

  onLoginNotify():void {
    var disabled = !this.isActive;
    if(this.dialogRef == null){
    this.dialogRef = this.dialog.open(UserSignUpComponent, {panelClass: 'full-width-dialog',
    data :{disabled},
    disableClose: false,
    });
    }
    console.log(this.dialogRef.componentInstance.data);
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }
  onSignInNotify():void {
    var disabled = this.isActive;
    if(this.dialogRef == null){
    this.dialogRef = this.dialog.open(UserSignUpComponent, {panelClass: 'full-width-dialog',
    data :{disabled},
    disableClose: false,
    });
    }
    console.log(this.dialogRef.componentInstance.data);
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
    const sub = this.dialogRef.componentInstance.success.subscribe((result) => {
      this.signup = result;
    });
  }

}
