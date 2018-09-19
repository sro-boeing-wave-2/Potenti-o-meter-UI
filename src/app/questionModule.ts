export class QuestionModel {
  public questionId : string;
  public domain : string;
  public questionText : string;
  public optionList : Options[];
  public questionType : string;
  public conceptTags : string[];
  public userResponse : string;
  public difficultyLevel : number;
  public isCorrect : boolean;

}

class Options{
  public option : string;
}

