import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { Injectable, EventEmitter, Input, Inject} from '@angular/core';
import { QuestionModel } from './questionModule';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from './responseModel';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AdItem } from './ad-item';
import { McqComponent } from './mcq/mcq.component';
import { FillInTheBlanksComponent } from './fill-in-the-blanks/fill-in-the-blanks.component';
import { PlayerComponent } from './player/player.component';

@Injectable()
export class PlayerService {
  private _connection: HubConnection;
  private _question: Subject<any>;
  result: any;

  @Input() response: any;

  constructor(private router: Router, @Inject(DOCUMENT) private document: any)
  {
    this._question = new Subject();
  }

// private resulturl = "http://localhost:4300/start";
private url="";

  startQuiz(userId: number, domain: string)
  {
    console.log("THIS IS INSIDE STARTQUIZ");
    this._connection = new HubConnectionBuilder().withUrl("http://172.23.239.199:8010/question").build();
    this._connection.on('NextQuestion', this.onNextQuestionHandler.bind(this));
    // this._connection.on('EndQuiz', this.onQuizEnded.bind(this));

    this._connection.start().then(() => { this._connection.invoke('StartQuiz', userId, domain); });
    //this.playerComponent.loadComponent();
  }

  getQuestionStream(): Observable<QuestionModel> {
    return this._question.pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    return throwError(err.message || "Not Found");
  }

  getNextQuestion(response: any) {
    //console.log("this is inside Get next question " + response.userResponse);
    return this._connection.invoke('GetNextQuestion', response);
  }

  onNextQuestionHandler(nextQuestion) {
    console.log("This is the nextQuestion", nextQuestion);
    return this._question.next(nextQuestion);
  }

  endQuiz(question : any) {
    console.log("inside end quiz of player service");
    console.log(JSON.stringify(question));
    this._connection.invoke('EndQuiz', question);
    this._connection.on('EndQuiz', msg => {
         this.result = msg;
         console.log("result is " +  JSON.stringify(this.result));
         this._connection.stop();
          // this.url = "http://172.23.238.183:4301/start/" + this.result.userId + "/" + this.result.domainName;
          // this.document.location.href = this.url;
          });

  }


  getComponents() {
    return [
      new AdItem(McqComponent),
      new AdItem(FillInTheBlanksComponent)

    ];

   }
}
