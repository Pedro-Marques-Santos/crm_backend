import { Router } from "express";
import { ListAllEmploymentsController } from "../../../../modules/employment/useCases/ListAllEmployments/ListAllEmploymentsController";

const listAllEmploymentsRoute = Router();

const listAllEmplyomentController = new ListAllEmploymentsController();

listAllEmploymentsRoute.post("/", (request, response) => {
  return listAllEmplyomentController.handle(request, response);
});

export { listAllEmploymentsRoute };
