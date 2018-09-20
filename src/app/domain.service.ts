import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {UserResult} from './UserResult';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  _Result : UserResult;
  constructor(private http: Http) {
   }

   // method to get all the domains of a user
   getDomainsOfUser(userId){
    return this.http.get("https://localhost:44343/api/QuizResult/domains?userId="+userId);
  }


}
