import { Router } from "express";
import { EditResumeController } from "../../../../modules/users/useCases/EditResume/EditResumeController";
import { googleAuthentication } from "../middlewares/googleAuthentication";
import { uploadPdfInMemory } from "../middlewares/firebaseStorage";

const editResumeRoute = Router();

const editResumeController = new EditResumeController();

editResumeRoute.post(
  "/",
  googleAuthentication,
  uploadPdfInMemory,
  (request, response) => {
    return editResumeController.handle(request, response);
  },
);

export { editResumeRoute };
