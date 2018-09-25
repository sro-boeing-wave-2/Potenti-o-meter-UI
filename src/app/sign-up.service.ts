import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './User';
import { HttpHeaders } from '@angular/common/http';
import { Login} from './Login';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private header: HttpHeaders;
  constructor(private http: Http) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  }

  USerSignUp(user: User) {
    return this.http.post("http://13.126.26.172/auth/Register", user);
  }
  USerLogIn(user: Login) {
    return this.http.post("http://13.126.26.172/auth/Login", user, {withCredentials: true});
  }
  UserLogOut(){
    return this.http.post("http://localhost:5050/api/Users/Logout","");
  }
  getName(){
    return this.http.get("http://13.126.26.172/auth/details", {withCredentials: true});
  }
  GetDomain(){
    type ArrayOfTypeDomain = Array<{name: string}>;
    const arr: ArrayOfTypeDomain= [
      {name: 'C#'},
      {name : 'Java'},
      {name: 'Algorithms'},
      {name: 'Python'},
  ];
  return arr;
  }
}
