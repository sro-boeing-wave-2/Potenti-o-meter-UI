import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  //method to get domains of a user
  getQuizDomains()
  {
    return this.http.get("http://13.126.26.172/conceptmap/domain");
  }

  getRecommendations(id,domain)
  {
    var url = "http://13.126.26.172/api/contentrecommender/id/" +id+"/"+domain;
    console.log(url);
    return this.http.get(url);
  }

  // getDomainDetails()
  // {
  //   return this.http.get("E:\Potenti-o-meter-UI\src\assets\data\domain.json");
  // }

  constructor(private http : Http) { }
}
