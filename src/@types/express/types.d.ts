declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    file: any;
    imgFile: any;
    pdfFile: any;
  }
}
