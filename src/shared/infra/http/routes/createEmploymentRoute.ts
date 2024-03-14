import { Router } from "express";
import { googleAuthentication } from "../middlewares/googleAuthentication";
import { CreateEmploymentController } from "../../../../modules/employment/useCases/CreateEmployment/CreateEmploymentController";

const createEmploymentRoute = Router();

const createEmploymentController = new CreateEmploymentController();

createEmploymentRoute.post("/", googleAuthentication, (request, response) => {
  return createEmploymentController.handle(request, response);
});

export { createEmploymentRoute };
