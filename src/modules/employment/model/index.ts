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
  ourparticipants: [
    { _id: false, id: String, questions: [{ type: String }], step: Number },
  ],
  questionaboutjob: [{ type: String }],
  companyId: String,
  createdAt: { type: Date },
  dataExpiration: {
    type: Date,
  },
  dataExpirationActivity: Boolean,
  dataDelete: {
    type: Date,
  },
  wage: [{ type: String }],
  companyImg: String,
  steps: [{ stepName: String, _id: false }],
});

const Employment = mongoose.model("employmenties", EmploymentSchema);

export { Employment };
