import { Router } from "express";
import { EditEmploymentController } from "../../../../modules/employment/useCases/EditEmployment/EditEmploymentController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const editEmploymentRoute = Router();

const editEmploymentController = new EditEmploymentController();

editEmploymentRoute.post("/", googleAuthentication, (request, response) => {
  return editEmploymentController.handle(request, response);
});

export { editEmploymentRoute };
