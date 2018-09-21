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
  Math: any;
  _result: UserResult;
  quizResult: QuizResult;
  questionList: QuestionsAttempted[];
  question = [];
  _questions: QuestionsAttempted[];
  tags = [];
  length: number;
  tagListofFirstElement = [];
  tagListofPrevElement = [];
  quizResultArray: QuizResult[];
  chart = [];
  chartPrev = [];
  lineGraph = [];
  firstQuizElement: QuizResult;
  prevQuizElement: QuizResult;
  cumulativeTagWiseResult: CumulativeTagScore[] = [];
  cumulativeChart = [];
  changePrevious: number;
  changeFirst: number;
  labelsArray = [];
  scoreArray = [];

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



    this.Math = Math;
    this.resultService.getUserResult(this.quizId).subscribe(data => {
      this._result = data.json();
      this.length = this._result.quizResults.length - 1;
      this.firstQuizElement = this._result.quizResults[0];
      this.prevQuizElement = this._result.quizResults[this.length - 1];
      const questionsListArray = this._result.quizResults[length].questionsAttempted
      this.question.push(...questionsListArray);

      //console.log(this._result.quizResults.length);
      //console.log(this.question[0]);
      const cumulativeTagWiseList = this._result.tagWiseCumulativeScore;
      //console.log("Result" + JSON.stringify(this._result));
      console.log("cumulativeTagWiseList:" + cumulativeTagWiseList);
      this.cumulativeTagWiseResult.push(...cumulativeTagWiseList);
      let cumulativeConcept = this.cumulativeTagWiseResult.map(res => res.tagName);
      let cumulativeScore = this.cumulativeTagWiseResult.map(res => res.tagRating);
      console.log("cumalative scores:" + cumulativeScore);

      // let sortedcumulative = cumulativeScore.sort().reverse();
      // Added
      const tagList = this._result.quizResults[this.length].tagWiseResults;
      this.tags.push(...tagList);
      // console.log(this.tags);
      // first Quiz
      const tagListFirstElement = this.firstQuizElement.tagWiseResults;
      this.tagListofFirstElement.push(...tagListFirstElement)
      let firstTagPc = this.tagListofFirstElement.map(res => res.tagRating);
      // previous Quiz
      const tagListPrevElement = this.prevQuizElement.tagWiseResults;
      this.tagListofPrevElement.push(...tagListPrevElement)
      let prevTagPc = this.tagListofPrevElement.map(res => res.tagRating);
      //Last Quiz
      let tagNames = this.tags.map(res => res.tagName); //extract the tagNames to label the chart
      // console.log(tagNames);
      var tagCorrectPc = this.tags.map(res => res.tagRating);
      //code to start numbering from Zero in the radar chart

      // this.labelsArray.length = this._result.quizResults.length;

      console.log("Quiz taken:" + this.labelsArray.length);

        for (var i = 1; i <= this._result.quizResults.length; i++) {
          this.labelsArray.push(i);
          console.log(i);
      }
      console.log(this.labelsArray);

      ////Score Array
      this.scoreArray.push(...this._result.quizResults.map(res => res.percentageScore));
      console.log(this.scoreArray);




      this.lineGraph = new Chart('canvasLine', {
        type: 'line',
        data: {
          labels: this.labelsArray,
          datasets: [{
            data: this.scoreArray,
            label: this._result.domainName,
            borderColor: "#3e95cd",
            fill: false
          }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Progress Graph'
          }
        }
      });


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
      //Comparison with previous Quiz

      this.chartPrev = new Chart('canvas1', {
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
            label: "Previous QUiz Result",
            data: prevTagPc,
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
      this.changePrevious = Math.fround((this._result.quizResults[this.length].percentageScore - this._result.quizResults[this.length - 1].percentageScore) / this._result.quizResults[this.length - 1].percentageScore) * 100;
      this.changeFirst = Math.fround((this._result.quizResults[this.length].percentageScore - this._result.quizResults[0].percentageScore) / this._result.quizResults[0].percentageScore) * 100;


      //_result?.quizResults[length].obtainedScore
      //(_result?.quizResults[length]?.percentageScore - _result?.quizResults[length-1]?.percentageScore)/_result?.quizResults[length-1]?.percentageScore)*100
    });
  }
}





