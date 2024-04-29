import { Router } from "express";
import { ExpirationEmploymentController } from "../../../../modules/employment/useCases/ExpirationEmployment/ExpirationEmploymentController";

const expirationEmploymentRoute = Router();

const expirationEmploymentController = new ExpirationEmploymentController();

expirationEmploymentRoute.post("/", (request, response) => {
  return expirationEmploymentController.handle(request, response);
});

export { expirationEmploymentRoute };
