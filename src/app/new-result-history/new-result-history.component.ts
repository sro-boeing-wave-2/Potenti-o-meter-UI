import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultService } from '../result.service';
import { UserResult, QuizResult, QuestionsAttempted, CumulativeTagScore, TagWiseResult } from '../UserResult';
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
  lineGraph = [];
  cumulativeChart = [];
  cumulativeTagWiseResult: CumulativeTagScore[] = [];
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

      this.quizResultList.push(...this._result.quizResults);

       this.length = this.quizResultList.length;








      console.log(this._result.quizResults[this.length-1].percentageScore);
      this.changeFirst = Math.fround((this._result.quizResults[this.length-1].percentageScore - this._result.quizResults[0].percentageScore) / this._result.quizResults[0].percentageScore) * 100;
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
      console.log(cumulativeTagWiseList);
      console.log("cumulativeTagWiseList:" + cumulativeTagWiseList);
      this.cumulativeTagWiseResult.push(...cumulativeTagWiseList);
      let cumulativeConcept = this.cumulativeTagWiseResult.map(res => res.tagName);
      let cumulativeScore = this.cumulativeTagWiseResult.map(res => res.tagRating);
      console.log(JSON.stringify(this.cumulativeTagWiseResult));

      this.noConcepts = this._result.tagWiseCumulativeScore.length;
      console.log("here"+ JSON.stringify(this._result.tagWiseCumulativeScore[0].taxonomyListAndScores));
      for(var i = 0; i<this.noConcepts; i++)
      {
        this.mulFactor[i] = this._result.tagWiseCumulativeScore[i].tagRating / (this._result.tagWiseCumulativeScore[i].taxonomyListAndScores[0].taxonomyScoreNumber + this._result.tagWiseCumulativeScore[i].taxonomyListAndScores[1].taxonomyScoreNumber + this._result.tagWiseCumulativeScore[i].taxonomyListAndScores[2].taxonomyScoreNumber + this._result.tagWiseCumulativeScore[i].taxonomyListAndScores[3].taxonomyScoreNumber + this._result.tagWiseCumulativeScore[i].taxonomyListAndScores[4].taxonomyScoreNumber + this._result.tagWiseCumulativeScore[i].taxonomyListAndScores[5].taxonomyScoreNumber);
      }

      for(var j = 0; j < this.noConcepts; j++)
      {
        this.conceptList[j] = this._result.tagWiseCumulativeScore[j].tagName;
      }

      for(var k = 0; k < this.noConcepts; k++)
      {
        this.remember[k] = this._result.tagWiseCumulativeScore[k].taxonomyListAndScores[0].taxonomyScoreNumber * this.mulFactor[k];
        this.understand[k] = this._result.tagWiseCumulativeScore[k].taxonomyListAndScores[1].taxonomyScoreNumber * this.mulFactor[k];
        this.apply[k] = this._result.tagWiseCumulativeScore[k].taxonomyListAndScores[2].taxonomyScoreNumber * this.mulFactor[k];
        this.analyze[k] = this._result.tagWiseCumulativeScore[k].taxonomyListAndScores[3].taxonomyScoreNumber * this.mulFactor[k];
        this.evaluate[k] = this._result.tagWiseCumulativeScore[k].taxonomyListAndScores[4].taxonomyScoreNumber * this.mulFactor[k];
        this.create[k] = this._result.tagWiseCumulativeScore[k].taxonomyListAndScores[5].taxonomyScoreNumber * this.mulFactor[k];

      }

      //Bar Graph
      var TaxoData =
       {
          label: 'Taxonomy Score',
          data: this.cumulativeTagWiseResult.map(result => result.taxonomyScore),
          backgroundColor: "rgba(255, 150, 21, 1)"
       };

       var barChart = new Chart('barchartid', {
        type: 'bar',
        //   options: {
        //     scales: {
        //         yAxes: [{
        //             ticks: {
        //                 beginAtZero: true
        //             }
        //         }]
        //     }
        // },
        options: {
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          }
        },
        data: {
          // labels: currentTaxonomyConcept.slice(0, currentConceptLength),
          labels: this.conceptList,
          // datasets: [TaxoData]
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
