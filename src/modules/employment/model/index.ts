import mongoose from "mongoose";
import { IEmployment } from "../interfaces";

const EmploymentSchema = new mongoose.Schema<IEmployment>({
  name: String,
  title: String,
  descrition: String,
  occupationarea: [{ type: String }],
  entrylevel: String,
  typehiring: String,
  workmodality: String,
  city: String,
  region: String,
  questionAboutJob: [{ type: String }],
});

const Employment = mongoose.model("employmenties", EmploymentSchema);

export { Employment };
