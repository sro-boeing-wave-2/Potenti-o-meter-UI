import { Component, OnInit, Input ,Output, EventEmitter} from '@angular/core';
import { QuestionModel } from '../questionModule';
import { AdComponents } from '../adComponent';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-fill-in-the-blanks',
  templateUrl: './fill-in-the-blanks.component.html',
  styleUrls: ['./fill-in-the-blanks.component.css']
})
export class FillInTheBlanksComponent implements OnInit , AdComponents{

  private _response: string;
  public options : string[];

  get response() {
    return this._response;
  }

  set response(responseValue) {
    console.log(responseValue);
    this._response = responseValue;
    this.localStorage.store("response", responseValue);
    this.onResponse.emit(responseValue);
  }
  ngOnInit() {}
  constructor(private localStorage: LocalStorageService) { }
  @Input() question: QuestionModel;
  @Output() onResponse = new EventEmitter<any>();
}
