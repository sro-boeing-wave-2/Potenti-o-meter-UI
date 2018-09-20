import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { Injectable, EventEmitter, Input, Inject} from '@angular/core';
import { QuestionModel } from './questionModule';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from './responseModel';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdItem } from './ad-item';
import { McqComponent } from './mcq/mcq.component';
import { FillInTheBlanksComponent } from './fill-in-the-blanks/fill-in-the-blanks.component';
import { PlayerComponent } from './player/player.component';

@Injectable()
export class PlayerService {
  private _connection: HubConnection;
  private _question: Subject<any>;
  result: ResponseModel;

  @Input() response: any;

  constructor(private router: Router, @Inject(DOCUMENT) private document: any)
  {
    this._question = new Subject();
  }

private resulturl = "http://localhost:4300/start";
private url="";

  startQuiz(userId: number, domain: string)
  {
    this._connection = new HubConnectionBuilder().withUrl("http://172.23.238.155:9100/question").build();
    this._connection.on('NextQuestion', this.onNextQuestionHandler.bind(this));
    // this._connection.on('EndQuiz', this.onQuizEnded.bind(this));
    console.log("this is the front end domain" + domain);
    this._connection.start().then(() => { this._connection.invoke('StartQuiz', userId, domain); });
  }

  getQuestionStream(): Observable<QuestionModel> {
    return this._question.pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(err.message || "Not Found");
  }

  getNextQuestion(response: QuestionModel) {
    //console.log("this is inside Get next question " + response.userResponse);
    return this._connection.invoke('GetNextQuestion', response);
  }

  onNextQuestionHandler(nextQuestion) {
    return this._question.next(nextQuestion);
  }

  endQuiz(question : QuestionModel) {
    console.log("inside end quiz of player service");
    this._connection.invoke('EndQuiz', question);
    this._connection.on('EndQuiz', msg => {
         this.result = msg;
         console.log("result is " +  JSON.stringify(this.result));

        //  this.router.navigate(['result/abcd']);


         //this.router.navigate("localhost:4200/")

        //  this.url = `${this.quizurl}/${this.selectedUser.id}/${DomainName}`;
        //  this.url = `http://172.23.238.183:4301/start/77/maths`;

        //   this.document.location.href = this.url;
          });

  }





  // onQuizEnded() {
  //   this._connection.invoke('endQuiz');
  //   // this._connection.on('endQuiz', msg => {
  //   //   this.result = msg;
  //   //   console.log("result is " + this.result.questionAttendedCount);
  //   // });

  // }

  // getComponents() {
  //   return [
  //     new AdComponents(McqComponent, "hello man"),
  //     new AdComponents(FillInTheBlanksComponent,"hello sddc")
  //   ];
  // }

  getComponents() {
    return [
      new AdItem(McqComponent),
      new AdItem(FillInTheBlanksComponent)

    ];

   }
}

