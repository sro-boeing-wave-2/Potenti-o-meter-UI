import { Injectable } from '@angular/core';
import {UserResult} from './UserResult';
import {Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ResultDomainService {
  _Result : UserResult;

  //method to get domains of a user
  getDomainsOfUser(userId)
  {
    return this.http.get("http://localhost/api/QuizResult/domains?userId="+userId);
  }
  getByUserId_Domain(userId,domainName){
    return this.http.get("http://localhost/api/QuizResult?userId="+userId+"&domainName="+domainName);
  }

  constructor(private http : Http) { }
}
