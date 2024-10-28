import { Router } from "express";
import { EditImgCompanyController } from "../../../../modules/companies/useCases/EditImgCompany/EditImgCompanyController";
import { googleAuthentication } from "../middlewares/googleAuthentication";
import { uploadImageInMemory } from "../middlewares/firebaseStorage";

const editImgCompanyRoute = Router();

const editImgCompanyController = new EditImgCompanyController();

editImgCompanyRoute.post(
  "/",
  googleAuthentication,
  uploadImageInMemory,
  (request, response) => {
    return editImgCompanyController.handle(request, response);
  },
);

export { editImgCompanyRoute };
