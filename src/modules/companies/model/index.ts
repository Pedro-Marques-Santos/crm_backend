import { ICompany } from "../interfaces";
import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema<ICompany>({
  name: String,
  idgoogle: String,
  createdjobs: [{ type: String }],
  isRecruiter: { type: Boolean },
  imgprofile: String,
});

const Company = mongoose.model("companies", CompanySchema);

export { Company };
