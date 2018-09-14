import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { QuestionModel } from '../questionModule';
//import {PlayerService} from '../player.service';
@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit {

  private _response: string;
  public options : string[];

  get response() {
    return this._response;
  }

  set response(responseValue) {
    console.log(responseValue);
    this._response = responseValue;
    this.onResponse.emit(responseValue);
  }

  constructor() { }

  ngOnInit() {}

  @Input() question: QuestionModel;
  @Output() onResponse = new EventEmitter<any>();
}
