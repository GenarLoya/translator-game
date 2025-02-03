import { Hono } from "hono";
import { QuestionRepository } from "../repositories/questions/question.ts";

export const routerQuestions = new Hono();

routerQuestions.post("/generate-question", (c) => {
  const question = QuestionRepository.generateQuestion();

  return c.json(question.toQuestionPartial(), 200);
});

routerQuestions.post("/answer-question", async (c) => {
  const { id, answerIndex } = await c.req.json();

  const question = QuestionRepository.getQuestionWithAnswerById(id);
  const isCorrect = question.answerQuestion(answerIndex);

  return c.json({ isCorrect }, 200);
});
