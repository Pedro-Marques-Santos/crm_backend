import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";
import os from "os";

const execAsync = promisify(exec);

// Detecta o sistema operacional
const isWindows = os.platform() === "win32";

// Define o caminho do Ghostscript conforme o sistema operacional
const ghostscriptCommand = isWindows
  ? `"C:\\Program Files\\gs\\gs10.04.0\\bin\\gswin64.exe"`
  : "gs"; // No Linux, Ghostscript é chamado apenas como 'gs'

// Função para comprimir o PDF
export async function compressPDF(
  inputBuffer: Buffer,
  outputFilePath: string,
): Promise<void> {
  const tempInputPath = path.join(__dirname, "input.pdf");

  // Escreve o buffer do PDF original em um arquivo temporário
  fs.writeFileSync(tempInputPath, inputBuffer);

  // Comando para executar o Ghostscript
  const command = `${ghostscriptCommand} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputFilePath}" "${tempInputPath}"`;

  // Executa o comando e aguarda a compressão
  await execAsync(command);

  // Remove o arquivo temporário de entrada
  fs.unlinkSync(tempInputPath);
}
