import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomainService } from '../domain.service';
import { UserResult, QuizResult, QuestionsAttempted, CumulativeTagScore } from '../UserResult';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
  userId :string;
  public domains = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private domainService: DomainService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) =>
    {
      this.userId = params.get('userId');
    });
    this.domainService.getDomainsOfUser(this.userId).subscribe(result => {
      this.domains.push(...result.json())
      console.log(this.domains[1]);
    });
  }

}
