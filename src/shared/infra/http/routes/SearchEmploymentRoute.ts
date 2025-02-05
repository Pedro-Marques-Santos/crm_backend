import { Router } from "express";
import { SearchEmploymentController } from "../../../../modules/employment/useCases/SearchEmployment/SearchEmploymentController";

const SearchEmploymentRoute = Router();

const searchEmploymentController = new SearchEmploymentController();

SearchEmploymentRoute.post("/", (request, response) => {
  return searchEmploymentController.handle(request, response);
});

export { SearchEmploymentRoute };
