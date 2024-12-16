import { Router } from "express";
import { ReactiveEmploymentController } from "../../../../modules/employment/useCases/ReactiveEmployment/ReactiveEmploymentController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const reactiveEmploymentRoute = Router();

const reactiveEmploymentController = new ReactiveEmploymentController();

reactiveEmploymentRoute.post("/", googleAuthentication, (request, response) => {
  return reactiveEmploymentController.handle(request, response);
});

export { reactiveEmploymentRoute };
