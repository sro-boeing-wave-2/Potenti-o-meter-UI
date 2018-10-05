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
  noOfQuestions: number;

  constructor(public dialogRef: MatDialogRef<QuizResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuizResult[]) { }

  ngOnInit() {
    this.length = this.data.length;
    this.quizResponse = this.data[this.length - 1];
    this.noOfQuestions = this.quizResponse.questionsAttempted.length
    for(var i = 0; i< this.noOfQuestions; i++)
    {
      this.questionResponse[i] = this.quizResponse.questionsAttempted[i];
    }

  }


}
