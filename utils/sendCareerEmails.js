import nodemailer from "nodemailer";
import generateCareerAdminEmail from "../emailsTemplates/careers/toAdmin.js";
import generateCareerClientEmail from "../emailsTemplates/careers/toClient.js";

// Create Nodemailer transport using SendGrid
const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey", 
    pass: process.env.SENDGRID_API_KEY, 
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
