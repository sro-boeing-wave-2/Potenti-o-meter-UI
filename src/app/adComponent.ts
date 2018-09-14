import { Type } from '@angular/core';
import { QuestionModel } from './questionModule';

export class AdComponents {
  constructor(public component: Type<any>, public data: any) {}
}
