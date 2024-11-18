import { Router } from "express";
import { ActiveDateExpirationController } from "../../../../modules/employment/useCases/ActiviteDateExpiration/ActiviteDateExpirationController";

const activeDateExpirationRoute = Router();

const activeDateExpirationController = new ActiveDateExpirationController();

activeDateExpirationRoute.post("/", (request, response) => {
  return activeDateExpirationController.handle(response);
});

export { activeDateExpirationRoute };
