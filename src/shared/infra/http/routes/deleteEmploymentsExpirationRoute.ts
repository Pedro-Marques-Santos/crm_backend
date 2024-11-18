import { Router } from "express";
import { DeleteEmploymentsExpirationsController } from "../../../../modules/employment/useCases/DeleteEmploymentExpiration/DeleteEmploymentsExpirationController";

const deleteEmploymentsExpirationsRoute = Router();

const deleteEmploymentsExpirationController =
  new DeleteEmploymentsExpirationsController();

deleteEmploymentsExpirationsRoute.post("/", (request, response) => {
  return deleteEmploymentsExpirationController.handle(response);
});

export { deleteEmploymentsExpirationsRoute };
