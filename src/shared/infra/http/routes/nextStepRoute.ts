import { Router } from "express";

import { googleAuthentication } from "../middlewares/googleAuthentication";
import { NextStepController } from "../../../../modules/employment/useCases/NextStep/NextStepController";

const nextStepRoute = Router();

const nextStepController = new NextStepController();

nextStepRoute.post("/", googleAuthentication, (request, respose) => {
  return nextStepController.handle(request, respose);
});

export { nextStepRoute };
