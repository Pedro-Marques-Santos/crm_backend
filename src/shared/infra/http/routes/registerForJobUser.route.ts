import { Router } from "express";
import { googleAuthentication } from "../middlewares/googleAuthentication";
import { RegisterForJobUserController } from "../../../../modules/users/useCases/RegisterForJobUser/RegisterForJobUserController";

const registerForJobUserRoute = Router();

const registerForJobUserController = new RegisterForJobUserController();

registerForJobUserRoute.post("/", googleAuthentication, (request, response) => {
  return registerForJobUserController.handle(request, response);
});

export { registerForJobUserRoute };
