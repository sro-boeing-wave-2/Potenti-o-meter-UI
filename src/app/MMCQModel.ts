export class MMCQModel {
  public questionId : string;
  public title : string;
  public domain : string;
  public questionType : string;
  public conceptTags : string[];
  public taxanomy : string;
  public difficultyLevel : number;
  public questionText : string;
  public raw : string;
  public options : MMCQOption[];
  public correctOptions : MMCQOption[];
  public response : MMCQOption[];
 }

 class MMCQOption{
  public raw : string;
  public optionText : string;
 }
