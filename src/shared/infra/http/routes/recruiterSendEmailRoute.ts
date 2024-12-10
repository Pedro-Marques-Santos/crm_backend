import { Router } from "express";
import { RecruiterSendEmailController } from "../../../../modules/Email/useCases/RecruiterSendEmail/RecruiterSendEmailController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const recruiterSendEmailRoute = Router();

const recruiterSendEmailController = new RecruiterSendEmailController();

recruiterSendEmailRoute.post("/", googleAuthentication, (request, response) => {
  return recruiterSendEmailController.handle(request, response);
});

export { recruiterSendEmailRoute };
