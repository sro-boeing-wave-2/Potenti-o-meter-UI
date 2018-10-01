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
    return this.http.get("http://13.126.26.172/result/user/" + userId +"/domains");
  }
  getByUserId_Domain(userId,domainName){
    return this.http.get("https://13.126.26.172/result/"+userId+"/"+domainName);
  }

  constructor(private http : Http) { }
}
