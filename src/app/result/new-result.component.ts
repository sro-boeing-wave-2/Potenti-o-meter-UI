import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from '../result.service';
import { UserResult, QuizResult, QuestionsAttempted, CumulativeTagScore, TagWiseResult } from '../UserResult';
import { Chart } from 'chart.js';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuizResponseComponent } from '../quiz-response/quiz-response.component';

@Component({
  selector: 'app-new-result',
  templateUrl: './new-result.component.html',
  styleUrls: ['./new-result.component.css']
})
export class NewResultComponent implements OnInit {

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
  sortedCumulativeTagWiseResult: CumulativeTagScore[] = [];
  sortedCurrentTagWiseList = [];
  cumulativeChart = [];
  changePrevious: number;
  changeFirst: number;
  labelsArray = [];
  scoreArray = [];
  barChart = [];
  quizlist: string[] = [];
  taxonomyScore = [];
  currentQuiz: QuizResult;
  noConcepts: number;
  tagWiseResultsList: TagWiseResult[] = [];
  total: number;
  mulFactor: number[] = [];
  remember = [];
  understand: number[]= [];
  apply: number[]= [];
  analyze: number[]= [];
  evaluate: number[]= [];
  create: number[]= [];
  conceptList: string[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resultService: ResultService, public dialog: MatDialog) { }
  @ViewChild('content') content: ElementRef;

  //method to download result as pdf
  public downLoadResult() {
    var data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 200;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/jpeg', 1)
      let pdf = new jsPDF('p', 'mm', 'a4'); // a4 size page of PDF
      var position = 5; // change the margins in the pdf

      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)
      pdf.save('MyResult.pdf'); // Generated PDF
    });
  }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let quizId = params.get('quizId');
      this.quizId = quizId;
    });
    this.Math = Math;
    this.resultService.getUserResult(this.quizId).subscribe(data => {
      this._result = data.json();
      this.length = this._result.quizResults.length - 1;
      this.firstQuizElement = this._result.quizResults[0];
      //If there is only one Test,there is nothing to compare
      if (this.length == 0) {
        this.prevQuizElement = this.firstQuizElement;
      }
      else {
        this.prevQuizElement = this._result.quizResults[this.length - 1];
      }

      const questionsListArray = this._result.quizResults[length].questionsAttempted
      this.question.push(...questionsListArray);

      //Cumulative Taxonomy Score
      const cumulativeTagWiseList = this._result.tagWiseCumulativeScore;
      this.cumulativeTagWiseResult.push(...cumulativeTagWiseList);
      this.sortedCumulativeTagWiseResult = this.cumulativeTagWiseResult.sort((a, b) => b.taxonomyScore - a.taxonomyScore);


      this.noConcepts = this._result.quizResults[this.length].tagWiseResults.length;

      for (var i = 0; i < this.noConcepts; i++) {
        this.tagWiseResultsList[i] = this._result.quizResults[this.length].tagWiseResults[i];
        this.conceptList[i] = this._result.quizResults[this.length].tagWiseResults[i].tagName;
      }

      for (var j = 0; j < this.noConcepts; j++) {
       this.mulFactor[j] = this.tagWiseResultsList[j].tagRating / (this.tagWiseResultsList[j].taxonomyListAndScores[0].taxonomyScoreNumber + this.tagWiseResultsList[j].taxonomyListAndScores[1].taxonomyScoreNumber + this.tagWiseResultsList[j].taxonomyListAndScores[2].taxonomyScoreNumber + this.tagWiseResultsList[j].taxonomyListAndScores[3].taxonomyScoreNumber + this.tagWiseResultsList[j].taxonomyListAndScores[4].taxonomyScoreNumber + this.tagWiseResultsList[j].taxonomyListAndScores[5].taxonomyScoreNumber);

      }

      for(var k = 0; k < this.noConcepts; k++)
      {
        this.remember[k] = this.tagWiseResultsList[k].taxonomyListAndScores[0].taxonomyScoreNumber * this.mulFactor[k];
        this.understand[k] = this.tagWiseResultsList[k].taxonomyListAndScores[1].taxonomyScoreNumber * this.mulFactor[k];
        this.apply[k] = this.tagWiseResultsList[k].taxonomyListAndScores[2].taxonomyScoreNumber * this.mulFactor[k];
        this.analyze[k] = this.tagWiseResultsList[k].taxonomyListAndScores[3].taxonomyScoreNumber * this.mulFactor[k];
        this.evaluate[k] = this.tagWiseResultsList[k].taxonomyListAndScores[4].taxonomyScoreNumber * this.mulFactor[k];
        this.create[k] = this.tagWiseResultsList[k].taxonomyListAndScores[5].taxonomyScoreNumber * this.mulFactor[k];

      }



      //the length after removing values '0' from top 10 concept list
      var conceptLength = this.sortedCumulativeTagWiseResult.map(res => res.taxonomyScore).slice(0, 10).filter(Number).length;

      //This is used in radar graph
      let cumulativeConcept = this.cumulativeTagWiseResult.map(res => res.tagName);
      let cumulativeScore = this.cumulativeTagWiseResult.map(res => res.tagRating);
      let cumulativeTaxonomyScore = this.cumulativeTagWiseResult.map(res => res.taxonomyScore);

      //current-taxonomy-score details

      this.currentQuiz = this._result.quizResults[this.length];
      this.sortedCurrentTagWiseList = this.currentQuiz.tagWiseResults.sort((a, b) => b.taxonomyScore - a.taxonomyScore);
      let currentTaxonomyScore = this.sortedCurrentTagWiseList.map(res => res.taxonomyScore);
      let currentTaxonomyConcept = this.sortedCurrentTagWiseList.map(res => res.tagName);
      var currentConceptLength = currentTaxonomyScore.slice(0, 10).filter(Number).length;


      // Added
      const tagList = this._result.quizResults[this.length].tagWiseResults;
      this.tags.push(...tagList);

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

      var tagCorrectPc = this.tags.map(res => res.tagRating);

      ////Score Array
      this.scoreArray.push(...this._result.quizResults.map(res => res.percentageScore));

      //x-axis data for progress graph
      for (var i = 0; i <= this.length; i++) {
        this.quizlist[i] = "Attempt" + (i + 1);
      }
      // Progress graph
      this.lineGraph = new Chart('canvasLine', {
        type: 'line',
        data: {
          labels: this.quizlist,
          datasets: [{
            data: this.scoreArray,
            label: this._result.domainName,
            borderColor: "#3e95cd",
            fill: false
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: 100
              }
            }]
          },
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
        },
        legend: {
          labels: {
            fontFamily: 'Roboto',
            fontColor: 'black',
          }
        }
      };





      this.chart = new Chart('canvas2', {
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


      ////Cumulative chart
      this.cumulativeChart = new Chart('canva',
        {
          type: 'radar',
          options: options,
          data:
          {
            labels: cumulativeConcept,
            datasets: [
              {
                label: "Score",
                data: cumulativeScore,
                backgroundColor: "rgba(199, 50, 124, 0.6)",
                borderColor: "rgba(199, 50, 124, 0.8)",
                pointBackgroundColor: "rgba(199, 50, 124)",
                pointBorderColor: "whitesmoke",
              }],
            fill: false
          }
        });

      // Bar Graph for taxonomy

      var TaxoData =
      {
        label: 'Taxonomy Score',
        data: currentTaxonomyScore.slice(0, currentConceptLength),
        backgroundColor: "rgba(255, 150, 21, 1)"
      };

      var barChart = new Chart('barchartid', {
        type: 'bar',
        options: {
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          }
        },
        data: {
          labels: this.conceptList,
          datasets: [
            {
              label: 'Remember',
              data: this.remember,
              backgroundColor: '#4DAEE3'
            },
            {
              label: 'Understand',
              data: this.understand,
              backgroundColor: '#EE9F42'
            },
            {
              label: 'Apply',
              data: this.apply,
              backgroundColor: '#73C15C'
            },
            {
              label: 'Analyze',
              data: this.analyze,
              backgroundColor: '#A05BA0'
            },
            {
              label: 'Evaluate',
              data: this.evaluate,
              backgroundColor: '#F4C543'
            },
            {
              label: 'Create',
              data: this.create,
              backgroundColor: '#EBCCD1'
            }
          ]
        }
      });

      this._questions = this._result.quizResults[this.length].questionsAttempted;
      if (this.length == 0) {
        this.changePrevious = 0;
        this.changeFirst = 0;
      }
      else {
        this.changePrevious = Math.fround((this._result.quizResults[this.length].percentageScore - this._result.quizResults[this.length - 1].percentageScore) / this._result.quizResults[this.length - 1].percentageScore) * 100;
        this.changeFirst = Math.fround((this._result.quizResults[this.length].percentageScore - this._result.quizResults[0].percentageScore) / this._result.quizResults[0].percentageScore) * 100;
      }


    });
  }

  viewResponse() {
    let dialogRef = this.dialog.open(QuizResponseComponent, {
      data: this._result.quizResults
    });
  }
}







