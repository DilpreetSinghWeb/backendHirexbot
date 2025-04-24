import nodemailer from "nodemailer";
import generateContactAdminEmail from "../emailsTemplates/contact/toAdmin.js";
import generateContactClientEmail from "../emailsTemplates/contact/toClient.js";


const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

export default async function sendContactEmails(data) {
  const adminMail = generateContactAdminEmail(data);
  const clientMail = generateContactClientEmail(data);

  try {
    await transporter.sendMail(adminMail);
    
  } catch (err) {
    console.error("Error sending contact mail to admin:", err);
  }

  try {
    await transporter.sendMail(clientMail);

  } catch (err) {
    console.error("Error sending contact mail to client:", err);
  }
}
