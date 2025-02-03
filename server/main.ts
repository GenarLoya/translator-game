import { Hono } from "hono";
import { logger } from "hono/logger";
import { routerQuestions } from "./routes/questions.ts";
import {
  ErrorInternalServerError,
  ErrorNotFound,
  ErrorStatus,
} from "./helpers/erors.tsx";

const app = new Hono();

//* Error handler
app.use(async (c, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ErrorNotFound) {
      return c.text(error.info.statusText, error.info.status);
    }

    if (error instanceof ErrorInternalServerError) {
      return c.text(error.info.statusText, error.info.status);
    }

    return c.text("unknown_error", ErrorStatus.INTERNAL_SERVER_ERROR);
  }
});

app.use(logger());

//* Routes
app.route("/questions", routerQuestions);

//* Test route
app.get("/ok", (c) => {
  return c.text("ok", 200);
});

Deno.serve(app.fetch);
