import { Router } from "express";
import { NextGroupStepController } from "../../../../modules/employment/useCases/NextGroupStep/NextGroupStepController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const nextGroupStepRoute = Router();

const nextGroupStepController = new NextGroupStepController();

nextGroupStepRoute.post("/", googleAuthentication, (request, respose) => {
  return nextGroupStepController.handle(request, respose);
});

export { nextGroupStepRoute };
