import mongoose from "mongoose";
import { IEmployment } from "../interfaces";

const EmploymentSchema = new mongoose.Schema<IEmployment>({
  name: String,
  title: String,
  description: String,
  occupationarea: [{ type: String }],
  entrylevel: String,
  typehiring: String,
  workmodality: String,
  city: String,
  region: String,
  ourparticipants: [{ _id: false, id: String, questions: [{ type: String }] }],
  questionaboutjob: [{ type: String }],
  companyId: String,
  createdAt: { type: Date, default: Date.now },
  dataExpiration: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  },
  dataExpirationActivity: Boolean,
  dataDelete: {
    type: Date,
    default: () => new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
  },
  wage: [{ type: String }],
});

const Employment = mongoose.model("employmenties", EmploymentSchema);

export { Employment };
