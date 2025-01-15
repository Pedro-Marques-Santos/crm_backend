import { Router } from "express";
import { EditUserNoImgController } from "../../../../modules/users/useCases/EditUserNoImg/EditUserNoImgController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const editUserNoImgRoute = Router();

const editUserNoImgController = new EditUserNoImgController();

editUserNoImgRoute.post("/", googleAuthentication, (request, response) => {
  return editUserNoImgController.handle(request, response);
});

export { editUserNoImgRoute };
