import multer from "multer";
import sharp from "sharp";
import { bucketFirebaseStorage } from "../../../services/connectFirebaseSDK";
import { AppError } from "../../../errors/AppErrors";

const storage = multer.memoryStorage();

const MAX_PDF_SIZE = 2 * 1024 * 1024; // 2MB;

const uploadImageInMemory = multer({ storage }).single("file");

const uploadPdfInMemory = multer({ storage }).single("file");

const uploadMultiple = multer({ storage }).fields([
  { name: "file", maxCount: 1 }, // Para a imagem
  { name: "pdfFile", maxCount: 1 }, // Para o PDF
]);

async function deletedPdfFromFirebaseStorage(url: string): Promise<void> {
  try {
    const filePath = decodeURIComponent(
      url.split("/o/")[1].split("?alt=media")[0],
    );

    if (!filePath.startsWith("resumefolder/")) {
      throw new AppError("O arquivo não pertence à pasta imagesprofiles/", 400);
    }

    await bucketFirebaseStorage.file(filePath).delete();
  } catch (error) {
    if (error.code === 404) {
      return;
    } else {
      throw new AppError("Erro ao deletar imagem", 400);
    }
  }
}

async function deletedImgFromFirebaseStorage(url: string): Promise<void> {
  try {
    const filePath = decodeURIComponent(
      url.split("/o/")[1].split("?alt=media")[0],
    );

    if (!filePath.startsWith("imagesprofiles/")) {
      throw new AppError("O arquivo não pertence à pasta imagesprofiles/", 400);
    }

    await bucketFirebaseStorage.file(filePath).delete();
  } catch (error) {
    if (error.code === 404) {
      return;
    } else {
      throw new AppError("Erro ao deletar imagem", 400);
    }
  }
}

async function uploadPDFtoFirebaseStorage(
  file: Express.Multer.File,
  iduser: string,
): Promise<string> {
  try {
    const fileExtension = "." + file.originalname.split(".").pop();

    if (file.mimetype !== "application/pdf") {
      throw new AppError("We only accept PDF files!", 400);
    }

    if (file.size > MAX_PDF_SIZE) {
      throw new AppError(
        `PDF is too large! Maximum size allowed is ${MAX_PDF_SIZE / (1024 * 1024)} MB`,
        400,
      );
    }

    const filename = `resumefolder/${iduser}${fileExtension}`;

    await bucketFirebaseStorage.file(filename).save(file.buffer, {
      metadata: {
        contentType: "application/pdf",
      },
    });

    const url = `https://firebasestorage.googleapis.com/v0/b/${bucketFirebaseStorage.name}/o/${encodeURIComponent(
      filename,
    )}?alt=media`;

    return url;
  } catch (error) {
    throw new AppError("Erro ao adicionar o PDF, mas usuário ", 400);
  }
}

async function uploadImageFirebaseStorage(
  file: Express.Multer.File,
  iduser: string,
): Promise<string> {
  try {
    // Converte a imagem para JPEG com redimensionamento e compressão
    const compressedBuffer = await sharp(file.buffer)
      .resize({ width: 200, height: 200 }) // Redimensiona a imagem
      .jpeg({ quality: 80 }) // Converte para JPEG com qualidade 80%
      .toBuffer();

    // Nome do arquivo sempre como JPEG
    const filename = `imagesprofiles/${iduser}.jpeg`;

    // Salva a imagem no Firebase Storage
    await bucketFirebaseStorage.file(filename).save(compressedBuffer, {
      metadata: {
        contentType: "image/jpeg", // Tipo de conteúdo JPEG
      },
    });

    // Gera a URL pública da imagem
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucketFirebaseStorage.name}/o/${encodeURIComponent(
      filename,
    )}?alt=media`;

    return url;
  } catch (error) {
    throw new AppError("Erro ao adicionar imagem", 400);
  }
}

function verifyFileStorage(file: Express.Multer.File) {
  const allowedExtensions = [".pdf"];
  const fileExtension = "." + file.originalname.split(".").pop();

  if (file.size > MAX_PDF_SIZE) {
    throw new AppError(
      `PDF is too large! Maximum size allowed is ${MAX_PDF_SIZE / (1024 * 1024)} MB`,
      400,
    );
  }

  if (!allowedExtensions.includes(fileExtension)) {
    throw new AppError("We only accept PDF files!", 400);
  }
}

function verifyImgStorage(file: Express.Multer.File) {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = "." + file.originalname.split(".").pop();

  if (!allowedExtensions.includes(fileExtension)) {
    throw new AppError("We only accept jpg or png images!", 400);
  }
}

export {
  uploadImageInMemory,
  uploadImageFirebaseStorage,
  verifyImgStorage,
  uploadMultiple,
  verifyFileStorage,
  uploadPDFtoFirebaseStorage,
  deletedImgFromFirebaseStorage,
  deletedPdfFromFirebaseStorage,
  uploadPdfInMemory,
};
