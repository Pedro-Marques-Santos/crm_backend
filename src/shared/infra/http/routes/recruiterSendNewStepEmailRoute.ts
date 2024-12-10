import { Router } from "express";
import { RecruiterSendNewStepEmailController } from "../../../../modules/Email/useCases/RecruiterSendNewStepEmail/RecruiterSendNewStepEmailController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const recruiterSendNewStepEmailRoute = Router();

const recruiterSendNewStepEmailController =
  new RecruiterSendNewStepEmailController();

recruiterSendNewStepEmailRoute.post(
  "/",
  googleAuthentication,
  (request, response) => {
    return recruiterSendNewStepEmailController.handle(request, response);
  },
);

export { recruiterSendNewStepEmailRoute };
