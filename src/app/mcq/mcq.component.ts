import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { QuestionModel } from '../questionModule';
import { AdComponents } from '../adComponent';
import { LocalStorageService } from 'ngx-webstorage';
import { MCQModel } from '../MCQModel';
//import {PlayerService} from '../player.service';
@Component({
 selector: 'app-mcq',
 templateUrl: './mcq.component.html',
 styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit, AdComponents {

 private _response: string;
 public options : string[];

 get response() {
   return this._response;
 }

 set response(responseValue) {
   console.log("setting the response " + responseValue);
   this._response = responseValue;
   this.localStorage.store("response", responseValue);
   this.onResponse.emit(responseValue);
 }

 constructor(private localStorage: LocalStorageService) { }

 ngOnInit() {}

 @Input() question:MCQModel;
 @Output() onResponse = new EventEmitter<any>();
}
