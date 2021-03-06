import { Injectable } from '@angular/core';
import {UserResult} from './UserResult';
import {Http} from '@angular/http';

@Injectable({
 providedIn: 'root'
})
export class ResultService {
 _Result : UserResult;

 getUserResult(quizId){

  //return this.http.get("https://localhost:44343/api/QuizResult/quizId/"+quizId);
  //  return this.http.get("http://localhost/api/QuizResult/quizId/"+quizId);
  // return this.http.get("https://localhost:44343/api/QuizResult/quizId/"+quizId);
   return this.http.get("http://13.126.26.172/result/quiz/"+quizId);
   //return this.http.get("http://localhost/api/QuizResult/quizId/"+quizId)

   //return this.http.get("https://localhost:44343/api/QuizResult?userId="+UserId+"&domainName="+DomainName);
   //return this.http.get("http://172.23.238.183/api/QuizResult?userId="+UserId+"&domainName="+DomainName);

 }

 getByUserId_Domain(userId,domainName){
  return this.http.get("http://13.126.26.172/result/"+userId+"/"+domainName);
    //  return this.http.get("https://localhost:44343/api/QuizResult?userId="+userId+"&domainName="+domainName);

}

 constructor(private http : Http) { }
}
