import { Router } from "express";
import { EditCompanyNoImgController } from "../../../../modules/companies/useCases/EditCompanyNoImg/EditCompanyNoImgController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const editCompanyNoImgRoute = Router();

const editCompanyNoImgController = new EditCompanyNoImgController();

editCompanyNoImgRoute.post("/", googleAuthentication, (request, response) => {
  return editCompanyNoImgController.handle(request, response);
});

export { editCompanyNoImgRoute };
