import { Router } from "express";
import { ProcessEmailController } from "../../../../modules/Email/useCases/ProcessEmail/ProcessEmailController";

const processEmailRoute = Router();

const processEmailController = new ProcessEmailController();

processEmailRoute.post("/", (request, response) => {
  return processEmailController.handle(response);
});

export { processEmailRoute };
