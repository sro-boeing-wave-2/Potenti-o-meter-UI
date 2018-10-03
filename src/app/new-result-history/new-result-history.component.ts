import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from '../result.service';
import { UserResult, QuizResult, QuestionsAttempted, CumulativeTagScore } from '../UserResult';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-new-result-history',
  templateUrl: './new-result-history.component.html',
  styleUrls: ['./new-result-history.component.css']
})
export class NewResultHistoryComponent implements OnInit {

  userId: number;
  domain: string;
  quizId: string;
  Math: any;
  _result: UserResult;
  quizResultList: QuizResult[] = [];
  quizlist: string[] = [];
  quizScoreList: number[] = [];
  length: number;
  changeFirst: number;
  changePrevious: number;
  lineGraph = [];
  cumulativeChart = [];
  cumulativeTagWiseResult: CumulativeTagScore[] = [];
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

      this.length = this.quizResultList.length;
      console.log(this._result.quizResults[this.length-1].percentageScore);
      this.changeFirst = Math.fround((this._result.quizResults[this.length-1].percentageScore - this._result.quizResults[0].percentageScore) / this._result.quizResults[0].percentageScore) * 100;
      this.changePrevious = Math.fround((this._result.quizResults[this.length-1].percentageScore - this._result.quizResults[this.length-2].percentageScore) / this._result.quizResults[this.length-2].percentageScore) * 100;
      for(var i = 0; i<this.length; i++)
      {
        this.quizlist[i] = "Attempt"+(i+1);
      }

      for(var i = 0; i<this.length; i++)
      {
        this.quizScoreList[i] = this._result.quizResults[i].percentageScore;
      }
      console.log(this.quizlist);
      console.log(this.quizScoreList);

      const cumulativeTagWiseList = this._result.tagWiseCumulativeScore;
      //console.log("Result" + JSON.stringify(this._result));
      console.log("cumulativeTagWiseList:" + cumulativeTagWiseList);
      this.cumulativeTagWiseResult.push(...cumulativeTagWiseList);
      let cumulativeConcept = this.cumulativeTagWiseResult.map(res => res.tagName);
      let cumulativeScore = this.cumulativeTagWiseResult.map(res => res.tagRating);
      console.log(JSON.stringify(this.cumulativeTagWiseResult));

      //Bar Graph
      var TaxoData =
       {
          label: 'Taxonomy Score',
          data: this.cumulativeTagWiseResult.map(result => result.taxonomyScore),
          backgroundColor: "rgba(255, 150, 21, 1)"
       };

      var barChart = new Chart( 'barchartid', {
        ticks: {
          min: 0
        },
        type: 'line',
        data: {
          labels: this.cumulativeTagWiseResult.map(result => result.tagName),
          datasets: [TaxoData]
        }
      });


      //Progress Graph

      this.lineGraph = new Chart('canvasLine', {
        type: 'line',
        data: {
          labels: this.quizlist,
          datasets: [{
            data: this.quizScoreList,
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

      //Knowledge State

      this.cumulativeChart = new Chart('canva', {
        type: 'radar',

        options: options,
        data: {
          labels: cumulativeConcept,
          datasets: [
            {
              label: "Cumulative Concept Wise Score",
              data: cumulativeScore,
              backgroundColor: "rgba(0,0,200,0.2)"
            }],
          fill: false



        }

      });

      var options = {
        title: {
          display: true,
          text: 'Knowledge State'
        },
        responsive: true,
        maintainAspectRatio: true,
        scale: {
          ticks: {
            beginAtZero: true,
            max: 1
          }
        }
      };


    });
  }

}
