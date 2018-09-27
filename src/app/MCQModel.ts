export class MCQModel {
  public questionId : string;
  public title : string;
  public domain : string;
  public questionType : string;
  public conceptTags : string[];
  public taxanomy : string;
  public difficultyLevel : number;
  public questionText : string;
  public raw : string;
  public options : MCQOption[];
  public correctAnswer : MCQOption;
  public response : MCQOption;
 }

 class MCQOption{
  public raw : string;
  public optionText : string;
 }
