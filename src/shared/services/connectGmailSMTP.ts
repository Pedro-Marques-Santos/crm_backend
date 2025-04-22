import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USERGMAIL,
//     pass: process.env.EMAIL_PASSWORDGMAIL,
//   },
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERGMAIL,
    pass: process.env.EMAIL_PASSWORDGMAIL,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Falha ao conectar com Gmail SMTP:", error.message);
  } else {
    console.log("✅ Conexão com Gmail SMTP OK");
  }
});

export { transporter };
