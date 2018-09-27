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

  getDomainDetails()
  {
    return this.http.get("./domain.json");
  }

  constructor(private http : Http) { }
}
