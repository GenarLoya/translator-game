import { ErrorNotFound } from "../../helpers/erors.tsx";

type Question = {
  question: string;
};

type QuestionPartial = Question & {
  id: string;
  possibleAnswers: string[];
};

type QuestionWithAnswer = QuestionPartial & {
  answerIndex: number;
};

const questionsTestPalceHolder: QuestionWithAnswer[] = [
  {
    id: "1",
    question: "What is the capital of France?",
    possibleAnswers: ["Paris", "London", "Berlin"],
    answerIndex: 0,
  },
  {
    id: "2",
    question: "What is the capital of Spain?",
    possibleAnswers: ["Madrid", "Barcelona", "Valencia"],
    answerIndex: 1,
  },
  {
    id: "3",
    question: "What is the capital of Germany?",
    possibleAnswers: ["Berlin", "Munich", "Frankfurt"],
    answerIndex: 2,
  },
];

const questionsTestDB: QuestionWithAnswer[] = [];

export class QuestionRepository {
  id: QuestionWithAnswer["id"];
  question: QuestionWithAnswer["question"];
  possibleAnswers: QuestionWithAnswer["possibleAnswers"];
  private answerIndex: QuestionWithAnswer["answerIndex"];

  constructor(questionWithAnswer: QuestionWithAnswer) {
    this.id = questionWithAnswer.id;
    this.question = questionWithAnswer.question;
    this.possibleAnswers = questionWithAnswer.possibleAnswers;
    this.answerIndex = questionWithAnswer.answerIndex;
  }

  toQuestionPartial(): QuestionPartial & { id: QuestionWithAnswer["id"] } {
    return {
      id: this.id,
      question: this.question,
      possibleAnswers: this.possibleAnswers,
    };
  }

  static getQuestionWithAnswerById(
    id: QuestionWithAnswer["id"]
  ): QuestionRepository {
    const questionWithAnswer = questionsTestDB.find(
      (question) => question.id === id
    );

    if (!questionWithAnswer) {
      throw new ErrorNotFound("question_not_found");
    }

    return new QuestionRepository(questionWithAnswer);
  }

  static generateQuestion(): QuestionRepository {
    const question =
      questionsTestPalceHolder[
        Math.floor(Math.random() * questionsTestPalceHolder.length)
      ];

    const questionWithAnswer = {
      id: Math.random().toString(),
      question: question.question,
      possibleAnswers: question.possibleAnswers,
      answerIndex: question.answerIndex,
    };

    questionsTestDB.push(questionWithAnswer);

    return new QuestionRepository(questionWithAnswer);
  }

  answerQuestion(answerIndex: number): boolean {
    if (answerIndex === this.answerIndex) {
      return true;
    }
    return false;
  }
}
