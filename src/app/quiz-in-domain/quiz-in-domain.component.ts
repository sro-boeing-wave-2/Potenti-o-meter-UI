import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultDomainService } from '../result-domain.service';
import { UserResult, QuizResult, QuestionsAttempted, CumulativeTagScore } from '../UserResult';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-quiz-in-domain',
  templateUrl: './quiz-in-domain.component.html',
  styleUrls: ['./quiz-in-domain.component.css']
})
export class QuizInDomainComponent implements OnInit {

  userId : number;
  domainName : string;
  _result : UserResult;
  quizInDomain = [];
  lengthOfQuizArray = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resultDomainService: ResultDomainService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    this.userId = parseInt(params.get('userId'));
    this.domainName = params.get('domainName');

    });

    this.resultDomainService.getByUserId_Domain(this.userId,this.domainName).subscribe(data =>{
    this._result = data.json();
    this.quizInDomain = this._result.quizResults;
    let lengthOfQuiz = this.quizInDomain.length;
    for(var i = 1; i <= lengthOfQuiz ;i++)
      {
        this.lengthOfQuizArray.push(i);
      }
    console.log(this.lengthOfQuizArray);
    console.log(this.quizInDomain);
    });


  }


}
