import nodemailer from "nodemailer";
import generateCareerAdminEmail from "../emailsTemplates/careers/toAdmin.js";
import generateCareerClientEmail from "../emailsTemplates/careers/toClient.js";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.HOSTINGER_EMAIL_CAREER,
    pass: process.env.HOSTINGER_PASSWORD_CAREER,
  },
});

export default async function sendCareerEmails(data) {
  const adminMail = generateCareerAdminEmail(data);
  const clientMail = generateCareerClientEmail(data);

  try {
    await transporter.sendMail(adminMail);
  } catch (err) {
    console.error("Error sending mail to admin:", err);
  }

  try {
    await transporter.sendMail(clientMail);
  } catch (err) {
    console.error("Error sending mail to client:", err);
  }
}
