import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERGMAIL,
    pass: process.env.EMAIL_PASSWORDGMAIL,
  },
});

export { transporter };
