import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";

const execAsync = promisify(exec);

// Função para comprimir o PDF
export async function compressPDF(
  inputBuffer: Buffer,
  outputFilePath: string,
): Promise<void> {
  const tempInputPath = path.join(__dirname, "input.pdf");

  // Escreve o buffer do PDF original em um arquivo temporário
  fs.writeFileSync(tempInputPath, inputBuffer);

  // Comando para executar o Ghostscript
  const command = `"C:\\Program Files\\gs\\gs10.04.0\\bin\\gswin64.exe" -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputFilePath}" "${tempInputPath}"`;

  // Executa o comando e aguarda a compressão
  await execAsync(command);

  // Remove o arquivo temporário de entrada
  fs.unlinkSync(tempInputPath);
}
