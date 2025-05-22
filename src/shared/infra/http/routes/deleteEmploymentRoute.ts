import { Router } from "express";
import { DeleteEmploymentController } from "../../../../modules/employment/useCases/DeleteEmployment/DeleteEmploymentController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const deleteEmploymentRoute = Router();

const deleteEmploymentController = new DeleteEmploymentController();

deleteEmploymentRoute.post("/", googleAuthentication, (request, response) => {
  return deleteEmploymentController.handle(request, response);
});

export { deleteEmploymentRoute };
