import { QuestionModel } from "./questionModule";

export class ResponseModel {
  public userId: number;
  public domainName: string;
  public quizId:string;
  public currentQuestionIndex: number;
  public questionsAttempted: QuestionModel[];
  public questionBank: QuestionModel[];
}
