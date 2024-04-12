import { Router } from "express";
import { googleAuthentication } from "../middlewares/googleAuthentication";
import { CreateCompanyController } from "../../../../modules/companies/useCases/CreateCompany/CreateCompanyController";
import { uploadImageInMemory } from "../middlewares/firebaseStorage";

const createCompanyRoute = Router();

const createCompanyController = new CreateCompanyController();

createCompanyRoute.post(
  "/",
  googleAuthentication,
  uploadImageInMemory,
  (request, response) => {
    return createCompanyController.handle(request, response);
  },
);

export { createCompanyRoute };
