import { Router } from "express";
import { EditImgUserController } from "../../../../modules/users/useCases/EditImgUser/EditImgUserController";
import { googleAuthentication } from "../middlewares/googleAuthentication";
import { uploadImageInMemory } from "../middlewares/firebaseStorage";

const editImgUserRoute = Router();

const editImgCompanyController = new EditImgUserController();

editImgUserRoute.post(
  "/",
  googleAuthentication,
  uploadImageInMemory,
  (request, response) => {
    return editImgCompanyController.handle(request, response);
  },
);

export { editImgUserRoute };
