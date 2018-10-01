import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef,MatDialog, MatSnackBar } from '@angular/material';
import {UserLoginComponent} from '../user-login/user-login.component';
import { SignUpService} from '../sign-up.service';
import { User } from '../User';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Login } from '../Login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {
  public dialogForm: FormGroup;
  public loginForm: FormGroup;
  public login = false;
  @Output() success = new EventEmitter<boolean>();

  constructor( private fb: FormBuilder,private dialog: MatDialog,
  public dialogRef: MatDialogRef<UserSignUpComponent>,private UserSignUpService :SignUpService,
  @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,private loginservice :SignUpService) {
    this.dialogForm = this.fb.group({
      FirstName : new FormControl('',Validators.required),
      LastName: new FormControl('',Validators.required),
      Contact: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      Email: new FormControl('',[Validators.required, Validators.email]),
      Password: new FormControl('',[Validators.required,Validators.minLength(6)])
    });
    this.loginForm = this.fb.group({
      Email: new FormControl('',[Validators.required, Validators.email]),
      Password: new FormControl('',[Validators.required,Validators.minLength(6)])
    });
   }

  ngOnInit() {
  }
  public prop = !this.data.disabled;

  tabSwitch() {
    this.prop = !this.prop;
  }

  onSubmit():void{

  this.UserSignUpService.USerSignUp(this.dialogForm.value as User)
  .subscribe(result=>
    result.status == 201?this.GoBack(): this.Message())
  }

  LoginSubmit(): void {
    this.loginservice.USerLogIn(this.loginForm.value as Login)
    .subscribe(result=> {
      if(result.status == 200){
        this.AfterLogin()
      }
      if(result.status == 401)
      {
         this.Message()
      }
      });
  }

  GoBack(){
  this.dialogRef.close();
  this.success.emit(true);
  setTimeout(() => {
    this.success.emit(false);
  },2000)
  }

  AfterLogin(){
  this.dialogRef.close();
  // this.router.navigate(['dashboard']);
  }

  Message(){
    alert("unauthorized entry");
    this.login = true;
  setTimeout(() => {
    this.login = false;
  },2000)
  }

}
