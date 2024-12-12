import nodemailer from "nodemailer";
import config from "./config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: config.email.host_mail,
  port: 465,
  secure: true,
  auth: {
    user: config.email.sender_email,
    pass: config.email.pass_app,
  },
});
