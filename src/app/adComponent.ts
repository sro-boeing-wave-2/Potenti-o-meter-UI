import { Type } from '@angular/core';
import { QuestionModel } from './questionModule';

export interface AdComponents {
  //constructor(public component: Type<any>, public data: QuestionModel)
 question: QuestionModel;
}
