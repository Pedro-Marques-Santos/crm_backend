import { Router } from "express";

import { googleAuthentication } from "../middlewares/googleAuthentication";
import { AuthenticationController } from "../../../../modules/Authentication/useCases/authenticationController";

const authenticationRoute = Router();

const authenticationController = new AuthenticationController();

authenticationRoute.post("/", googleAuthentication, (request, response) => {
  return authenticationController.handle(request, response);
});

export { authenticationRoute };
