import { Router } from "express";
import { googleAuthentication } from "../middlewares/googleAuthentication";
import { CreateCompanyController } from "../../../../modules/companies/useCases/CreateCompany/CreateCompanyController";

const createCompanyRoute = Router();

const createCompanyController = new CreateCompanyController();

createCompanyRoute.post("/", googleAuthentication, (request, response) => {
  return createCompanyController.handle(request, response);
});

export { createCompanyRoute };
