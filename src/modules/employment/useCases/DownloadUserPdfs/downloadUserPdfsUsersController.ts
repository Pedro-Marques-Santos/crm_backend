import { Response, Request } from "express";

import { container } from "tsyringe";
import { DownloadUserPdfsUseCase } from "./downloadUserPdfsUsersUseCase";

class DownloadUserPdfsUseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { pdfUrlCollection } = request.body;

    const downloadUserPdfsUseCase = container.resolve(DownloadUserPdfsUseCase);

    response.setHeader("Content-Type", "application/zip");
    response.setHeader(
      "Content-Disposition",
      'attachment; filename="EasyRecruiter-PdfsResumes.zip"',
    );

    await downloadUserPdfsUseCase.execute(pdfUrlCollection, response);

    return response.end();
  }
}

export { DownloadUserPdfsUseController };
