import { config } from "../config/config.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.GOOGLE_USER,
    pass: config.GOOGLE_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Email transporter is ready to send emails");
  })
  .catch((err) => {
    console.error("Email transporter verification failed:", err);
  });

export async function sendEmail({ to, subject, html, text = "" }) {
  const mailOptions = {
    from: config.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };

  const details = await transporter.sendMail(mailOptions);
  console.log("Email sent:", details);
  return "email sent successfully, to " + to;
}
