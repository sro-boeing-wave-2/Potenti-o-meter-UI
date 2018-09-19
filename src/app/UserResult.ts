export class UserResult{
  userId : number;
  domainName : string;
  averagePercentage : number;
  quizResults : QuizResult[];
}

export class QuizResult{
  _id : string;
  questionsAttempted : QuestionsAttempted[];
  obtainedScore : number;
  totalScore : number;
  percentageScore : number;
  tagWiseResults : TagWiseResult[]
}

export class QuestionsAttempted{
  questionNumber : number;
  questionId : number;
  questionText : string;
  difficultyLevel : number;
  response : string;
  isCorrect : boolean;
  conceptTags : string[];
  correctAns : string;
}

export class TagWiseResult{
  tagName : string;
  tagCorrectAnsCount : string;
  tagTotalQuestCount : string;
  tagCorrectPercentage : string;
  tagRating : number;
}
