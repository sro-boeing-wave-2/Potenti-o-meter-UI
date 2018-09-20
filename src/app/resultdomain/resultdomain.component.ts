import { Component, OnInit } from '@angular/core';
import { ResultDomainService } from '../result-domain.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-resultdomain',
  templateUrl: './resultdomain.component.html',
  styleUrls: ['./resultdomain.component.css']
})
export class ResultdomainComponent implements OnInit {

   userId :number;
   domainsOfUser = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resultdomainService: ResultDomainService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userId = +params.get('userId'); // '+' is to convert string to integer
      // console.log(typeof(this.userId))   ;
    });

    this.resultdomainService.getDomainsOfUser(this.userId).subscribe(data => {
      this.domainsOfUser = data.json();

    });
  }

}
