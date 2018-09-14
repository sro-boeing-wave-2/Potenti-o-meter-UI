export class QuestionModel {
  public QuestionId : string;
  public Domain : string;
  public QuestionText : string;
  public OptionList : Options[];
  public QuestionType : string;
  public ConceptTags : string[];
  public userResponse : string;
  public DifficultyLevel : number;
  public IsCorrect : boolean;
}

class Options{
  public Option : string;
}

