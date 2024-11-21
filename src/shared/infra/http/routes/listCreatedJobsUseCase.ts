import { Router } from "express";
import { ListCreatedJobsController } from "../../../../modules/companies/useCases/ListCreatedJobs/ListCreatedJobsController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const listCreatedJobsRoute = Router();

const listCreateJobsController = new ListCreatedJobsController();

listCreatedJobsRoute.get("/", googleAuthentication, (request, response) => {
  return listCreateJobsController.handle(request, response);
});

export { listCreatedJobsRoute };
