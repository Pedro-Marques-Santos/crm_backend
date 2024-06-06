import multer from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { bucketFirebaseStorage } from "../../../services/connectFirebaseSDK";
import { AppError } from "../../../errors/AppErrors";

const storage = multer.memoryStorage();

const uploadImageInMemory = multer({ storage }).single("file");

async function uploadImageFirebaseStorage(
  file: Express.Multer.File,
): Promise<string> {
  try {
    const fileExtension = "." + file.originalname.split(".").pop();

    const compressedBuffer = await sharp(file.buffer)
      .resize({ width: 200, height: 200 })
      .jpeg({ quality: 80 })
      .toBuffer();

    const filename = uuidv4() + fileExtension;

    await bucketFirebaseStorage.file(filename).save(compressedBuffer, {
      metadata: {
        contentType: "image/jpeg",
      },
    });

    const url = `https://firebasestorage.googleapis.com/v0/b/${bucketFirebaseStorage.name}/o/${filename}?alt=media`;

    return url;
  } catch (error) {
    throw new AppError("Erro ao adicionar imagem", 400);
  }
}

function verifyImgStorage(file: Express.Multer.File) {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = "." + file.originalname.split(".").pop();

  if (!allowedExtensions.includes(fileExtension)) {
    throw new AppError("We only accept jpg or png images!", 400);
  }
}

export { uploadImageInMemory, uploadImageFirebaseStorage, verifyImgStorage };
