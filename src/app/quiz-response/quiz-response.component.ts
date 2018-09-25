import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuizResult, QuestionsAttempted } from '../UserResult';

@Component({
  selector: 'app-quiz-response',
  templateUrl: './quiz-response.component.html',
  styleUrls: ['./quiz-response.component.css']
})
export class QuizResponseComponent implements OnInit {

  length: number;
  quizResponse: QuizResult;
  questionResponse: QuestionsAttempted[] = [];

  constructor(public dialogRef: MatDialogRef<QuizResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuizResult[]) { }

  ngOnInit() {
    console.log("inside popup");
    this.length = this.data.length;
    this.quizResponse = this.data[this.length - 1];
    for(var i = 0; i< this.length; i++)
    {
      this.questionResponse[i] = this.quizResponse.questionsAttempted[i];
    }
    console.log(this.questionResponse);

  }


}
