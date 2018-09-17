import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef,MatDialog } from '@angular/material';
import {UserLoginComponent} from '../user-login/user-login.component';
import { SignUpService} from '../sign-up.service';
import { User } from '../User';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {

  constructor( private fb: FormBuilder,private dialog: MatDialog,
  public dialogRef: MatDialogRef<UserSignUpComponent>,private UserSignUpService :SignUpService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }
  //constructor(private UserSignUpService :SignUpService, private fb: FormBuilder){}
  ngOnInit() {
  }
  public prop = !this.data.disabled;

  CreateSignUpForm = this.fb.group({
    FirstName:[''],
    LastName:[''],
    Contact:[''],
    Email : [''],
    Password: ['']
  });
  tabSwitch() {
    this.prop = !this.prop;
  }

  // onSubmit():void{
  //   this.UserSignUpService.USerSignUp(this.CreateSignUpForm.value as User)
  //   .subscribe(result=> result.status == 201?this.GoBack(): this.Message(result.toString()));
  // }


  // GoBack(){
  //   this.dialogRef.close();
  // }
  // Message(result:string){
  // }

}
