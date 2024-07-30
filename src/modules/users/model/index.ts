import { IUser } from "../interfaces";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>({
  name: String,
  idgoogle: { type: String, unique: true, required: true },
  linkedinURL: String,
  email: String,
  workingGroup: [{ type: String }],
  description: String,
  date: { type: Date, required: true },
  registeredjobs: [{ _id: false, id: String, date: { type: Date } }],
  isRecruiter: { type: Boolean },
  imgprofile: { type: String },
});

const User = mongoose.model("users", UserSchema);

export { User };
