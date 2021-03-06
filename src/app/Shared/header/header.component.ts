import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { UserSignUpComponent } from '../../user-sign-up/user-sign-up.component'
import { SignUpService } from '../../sign-up.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private loginservice :SignUpService,
    private router: Router) { }
  @Output() notifyLogIn: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifySignIn: EventEmitter<string> = new EventEmitter<string>();
  @Input() validSignup;
  @Input() userDetail;
  @Input() homePage;
  @Input() result;
  @Input() loggedin;
  public UserData = [];


  ngOnInit() {
    if(this.loggedin) {
      this.loginservice.getName().subscribe({ next: result => {
        this.UserData = result.json();
      }, error: err => console.error(err)
      });
    }
  }

  LogIn() {
    this.notifyLogIn.emit('Log in button clicked');
    //let dialog = this.dialog.open(UserLoginComponent,{ width:'600px',panelClass: 'my-centered-dialog' });

  }
  SignUp() {
    this.notifySignIn.emit('Sign in button clicked');
    //let dialog = this.dialog.open(UserSignUpComponent,{ width:'600px',panelClass: 'my-centered-dialog' });
  }

  Logout(){
    this.loginservice.UserLogOut().subscribe(result => {
      result.status == 200?this.AfterLoginOut(): this.Message(result.toString())
    })
  }

  Dashboard() {
    this.router.navigate(['dashboard']);
  }

  AfterLoginOut(){
    this.router.navigate(['home']);
  }

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  Message(result: string){

  }
}
