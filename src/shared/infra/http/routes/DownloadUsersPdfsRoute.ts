import { Router } from "express";
import { DownloadUserPdfsUseController } from "../../../../modules/employment/useCases/DownloadUserPdfs/downloadUserPdfsUsersController";
import { googleAuthentication } from "../middlewares/googleAuthentication";

const downloadUsersPdfsRoute = Router();

const downloadUserPdfsUseController = new DownloadUserPdfsUseController();

downloadUsersPdfsRoute.post("/", googleAuthentication, (request, response) => {
  return downloadUserPdfsUseController.handle(request, response);
});

export { downloadUsersPdfsRoute };
