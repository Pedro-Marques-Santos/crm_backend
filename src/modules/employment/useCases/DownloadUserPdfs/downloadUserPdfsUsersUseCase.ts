import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppErrors";
import archiver from "archiver";
import axios from "axios";
import { Response } from "express";

@injectable()
class DownloadUserPdfsUseCase {
  async execute(pdfUrlCollection: string[], response: Response) {
    if (!pdfUrlCollection) {
      throw new AppError("No pdf URL found!", 404);
    }

    try {
      const archive = archiver("zip", { zlib: { level: 9 } });

      // Inicia o pipe do arquivo ZIP para a resposta
      archive.pipe(response);

      await Promise.all(
        pdfUrlCollection.map(async (pdfUrl: string) => {
          const pdfResponse = await axios.get(pdfUrl, {
            responseType: "arraybuffer",
          }); // Baixa o PDF como binário

          const fileName = pdfUrl
            .split("/resumefolder%2F")
            .pop()
            ?.split("?")[0];

          console.log(fileName);

          if (fileName) {
            archive.append(pdfResponse.data, { name: fileName }); // Adiciona o PDF ao ZIP
          }
        }),
      );

      await archive.finalize(); // Finaliza o arquivo ZIP
    } catch (error) {
      throw new AppError("Error downloading files!", 500);
    }
  }
}

export { DownloadUserPdfsUseCase };
