
export class UserResult{
  userId : number;
  domainName : string;
  averagePercentage : number;
  quizResults : QuizResult[];
  tagWiseCumulativeScore : CumulativeTagScore[];
}

export class QuizResult{
  quizId : string;
  date : Date;
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
  taxonomy : string;
  conceptTags : string[];
  correctAns : string;
  options : string[];
  questionType: string[];
}

export class TagWiseResult{
  tagName : string;
  tagCorrectAnsCount : string;
  tagTotalQuestCount : string;
  tagCorrectPercentage : string;
  tagRating : number;
  taxonomyLevel : string;
  taxonomyScore : number;
  taxonomyListAndScores : TaxonomyListAndScores[]
}

export class TaxonomyListAndScores
{
  taxonomyName : string;
  taxonomyScoreNumber : number;
}

export class CumulativeTagScore
    {
        tagName : string ;
        tagRating : number ;
        taxonomyLevelReached : string;
        taxonomyScore :number;
    }
