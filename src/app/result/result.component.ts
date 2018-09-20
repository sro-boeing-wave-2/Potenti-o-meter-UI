import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from '../result.service';
import { UserResult, QuizResult, QuestionsAttempted, CumulativeTagScore } from '../UserResult';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  // userId : number;
  // domain : string;
  quizId: string;

  _result: UserResult;
  quizResult: QuizResult;
  questionList: QuestionsAttempted[];
  question = [];
  _questions: QuestionsAttempted[];
  tags = [];
  length: number;
  tagListofFirstElement = [];
  quizResultArray: QuizResult[];
  chart = [];
  firstQuizElement: QuizResult;
  cumulativeTagWiseResult: CumulativeTagScore[] = [];
  cumulativeChart = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resultService: ResultService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      // let UserId = parseInt(params.get('userId'));
      // let Domain = params.get('domain');
      // this.userId = UserId;
      // this.domain = Domain;
      let quizId = params.get('quizId');
      this.quizId = quizId;

    });




    this.resultService.getUserResult(this.quizId).subscribe(data => {
      this._result = data.json();
      this.length = this._result.quizResults.length - 1;
      this.firstQuizElement = this._result.quizResults[0];
      const questionsListArray = this._result.quizResults[length].questionsAttempted
      this.question.push(...questionsListArray);

      //console.log(this._result.quizResults.length);
      //console.log(this.question[0]);
      const cumulativeTagWiseList = this._result.tagWiseCumulativeScore;
      console.log(cumulativeTagWiseList);
      this.cumulativeTagWiseResult.push(...cumulativeTagWiseList);
      let cumulativeConcept = this.cumulativeTagWiseResult.map(res => res.tagName);
      let cumulativeScore = this.cumulativeTagWiseResult.map(res => res.tagRating);
      let sortedcumulative = cumulativeScore.sort().reverse();
      // Added
      const tagList = this._result.quizResults[this.length].tagWiseResults;
      this.tags.push(...tagList);
      // console.log(this.tags);
      // first Quiz
      const tagListFirstElement = this.firstQuizElement.tagWiseResults;
      this.tagListofFirstElement.push(...tagListFirstElement)
      //  let firstTagNames = this.tagListofFirstElement.map(res => res.tagName);
      let firstTagPc = this.tagListofFirstElement.map(res => res.tagRating);
      //Last Quiz
      let tagNames = this.tags.map(res => res.tagName); //extract the tagNames to label the chart
      // console.log(tagNames);
      var tagCorrectPc = this.tags.map(res => res.tagRating);
      //code to start numbering from Zero in the radar chart
      var options = {
        responsive: true,
        maintainAspectRatio: true,
        scale: {
          ticks: {
            beginAtZero: true,
            max: 1
          }
        }
      };

      console.log("last" + tagCorrectPc);
      console.log("first" + firstTagPc);
      //console.log(Math.max.apply(null,tagCorrectPc));
      this.chart = new Chart('canvas', {
        type: 'radar',

        options: options,
        data: {
          labels: tagNames,
          datasets: [{
            label: "Latest Quiz Result",
            data: tagCorrectPc,
            backgroundColor: "rgba(200,0,0,0.2)"
          },
          {
            label: "First QUiz Result",
            data: firstTagPc,
            backgroundColor: "rgba(0,0,200,0.2)"
          }],
          fill: false



        }

      });
      //  //Cumulative chart
      this.cumulativeChart = new Chart('canva', {
        type: 'radar',

        options: options,
        data: {
          labels: cumulativeConcept,
          datasets: [
            {
              label: "Cumulative Quiz Wise Score",
              data: cumulativeScore,
              backgroundColor: "rgba(0,0,200,0.2)"
            }],
          fill: false



        }

      });

      this._questions = this._result.quizResults[this.length].questionsAttempted;

    });
  }
}




