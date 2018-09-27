import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from '../result.service';
import { UserResult, QuizResult, QuestionsAttempted, CumulativeTagScore } from '../UserResult';
import { Chart }  from 'chart.js';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { QuizResponseComponent } from '../quiz-response/quiz-response.component';





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
  barChart = [];
  taxonomyScore = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resultService: ResultService, public dialog: MatDialog) { }
  @ViewChild('content') content:ElementRef;

  //method to download result as pdf
  public downLoadResult(){
   var data = document.getElementById('content');
   html2canvas(data).then(canvas => {
     // Few necessary setting options
     var imgWidth = 208;
     var pageHeight = 295;
     var imgHeight = canvas.height * imgWidth / canvas.width;
     var heightLeft = imgHeight;

     const contentDataURL = canvas.toDataURL('image/jpeg',1)
     let pdf = new jsPDF('p', 'mm', 'legal'); // legal size page of PDF
     var position = 10; // change the margins in the pdf

     pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight)
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
      this.prevQuizElement = this._result.quizResults[this.length - 1];
      const questionsListArray = this._result.quizResults[length].questionsAttempted
      this.question.push(...questionsListArray);


      const cumulativeTagWiseList = this._result.tagWiseCumulativeScore;


      this.cumulativeTagWiseResult.push(...cumulativeTagWiseList);
      let cumulativeConcept = this.cumulativeTagWiseResult.map(res => res.tagName);
      let cumulativeScore = this.cumulativeTagWiseResult.map(res => res.tagRating);
      //Taxonomy Score
      let taxonomyScore = this.cumulativeTagWiseResult.map(res => res.taxonomyScore);


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

        for (var i = 1; i <= this._result.quizResults.length; i++) {
          this.labelsArray.push(i);
          console.log(i);
      }
      console.log("q--"+this.labelsArray);

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
        }
      };





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
              label: "Cumulative Quiz Wise Score",
              data: cumulativeScore,
              backgroundColor: "rgba(0,0,200,0.2)"
            }],
          fill: false
        }

      });

     // Bar Graph for taxonomy

       var TaxoData =
       {
          label: 'Taxonomy Score',
          data: taxonomyScore,
          backgroundColor: "rgba(0,0,200,0.2)"
       };

      var barChart = new Chart( 'barchartid', {
        ticks: {
          min: 0
           },
        type: 'bar',
        data: {
           labels: cumulativeConcept,
           datasets: [TaxoData]
          }
       });





      this._questions = this._result.quizResults[this.length].questionsAttempted;
      this.changePrevious = Math.fround((this._result.quizResults[this.length].percentageScore - this._result.quizResults[this.length - 1].percentageScore) / this._result.quizResults[this.length - 1].percentageScore) * 100;
      this.changeFirst = Math.fround((this._result.quizResults[this.length].percentageScore - this._result.quizResults[0].percentageScore) / this._result.quizResults[0].percentageScore) * 100;

      for (var j= 1; i <= this._result.quizResults.length; j++) {

        console.log(i);
    }

    });
  }

  viewResponse()
  {
    let dialogRef = this.dialog.open(QuizResponseComponent, {
      // width: '1500px',
      data: this._result.quizResults
    });
  }
}







