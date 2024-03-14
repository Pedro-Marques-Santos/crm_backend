import { ICompany } from "../interfaces";
import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema<ICompany>({
  name: String,
  idgoogle: String,
  lastname: String,
  createdjobs: [{ type: String }],
  isRecruiter: { type: Boolean },
});

const Company = mongoose.model("companies", CompanySchema);

export { Company };
