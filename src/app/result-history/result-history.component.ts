import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from '../result.service';
import { UserResult, QuizResult, QuestionsAttempted, CumulativeTagScore } from '../UserResult';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-result-history',
  templateUrl: './result-history.component.html',
  styleUrls: ['./result-history.component.css']
})
export class ResultHistoryComponent implements OnInit {


  userId: number;
  domain: string;
  quizId: string;
  Math: any;
  _result: UserResult;
  quizResultList: QuizResult[] = [];
  change: number;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resultService: ResultService) { }


  ngOnInit() {
    this.Math = Math;
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.userId = id;

    });
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let d = params.get('domain');
      this.domain = d;
    });


    //fetch data of a user in the given domain
    this.resultService.getByUserId_Domain(this.userId,this.domain).subscribe(data => {
      this._result = data.json();
      console.log(JSON.stringify(this._result.quizResults));

      this.quizResultList.push(...this._result.quizResults);
      console.log(this.quizResultList);

      this.change = Math.fround((this._result.averagePercentage - this._result.quizResults[0].percentageScore) / this._result.quizResults[0].percentageScore) * 100;




    });
    // console.log(this._result.quizResults);

    // this.quizResultArray.push(...this._result.quizResults);
    // console.log(this.quizResultList);

    // console.log(JSON.stringify(this.quizResultArray));


  }

}
