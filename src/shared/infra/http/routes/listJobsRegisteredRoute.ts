import { Router } from "express";
import { ListJobRegisteredController } from "../../../../modules/users/useCases/ListJobRegistered/ListJobRegisteredController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const listJobsRegisteredRoute = Router();

const listJobRegisteredController = new ListJobRegisteredController();

listJobsRegisteredRoute.post("/", googleAuthentication, (request, response) => {
  return listJobRegisteredController.handle(request, response);
});

export { listJobsRegisteredRoute };
