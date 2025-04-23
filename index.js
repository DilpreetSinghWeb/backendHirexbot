// server.js

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const app = express();


app.use(cors());
app.use(express.json());
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/careers", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, position, experience, message } =
      req.body;

    if (!firstName || !email || !position || !experience || !message) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail to Admin
    const mailToAdmin = {
      to: process.env.EMAIL_USER,
      from: email,
      subject: "New Career Application - HirexBot",
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f7fa;
              }
              .container {
                width: 100%;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                max-width: 600px;
                margin: 0 auto;
              }
              h3 {
                color: #333;
                font-size: 24px;
                margin-bottom: 20px;
              }
              p {
                font-size: 16px;
                color: #666;
                margin: 10px 0;
                line-height: 1.5;
              }
              .details {
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
              }
              .details p {
                font-size: 14px;
                color: #444;
                margin-bottom: 8px;
              }
              .details p strong {
                color: #333;
                font-weight: bold;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #aaa;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h3>New Job Application Received</h3>
              <p>An applicant has submitted their details through the career form. Details below:</p>
              <div class="details">
                <p><strong>Name:</strong> ${firstName} ${lastName || ""}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Position Applied For:</strong> ${position}</p>
                <p><strong>Experience:</strong> ${experience} years</p>
                <p><strong>Cover Letter:</strong><br>${message}</p>
              </div>
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} HirexBot. All rights reserved.
            </div>
          </body>
        </html>
      `,
    };
    console.log(process.env.EMAIL_USER)

    // Mail to Applicant
    const mailToClient = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Application Received - ${position} at HirexBot`,
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f7fa;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                background-color: #fff;
                margin: 30px auto;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h2 {
                color: #333;
                margin-bottom: 20px;
              }
              p {
                font-size: 16px;
                color: #555;
                line-height: 1.6;
              }
              .details {
                background-color: #f9f9f9;
                padding: 15px;
                margin-top: 15px;
                border-left: 4px solid #28a745;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                color: #aaa;
                font-size: 14px;
              }
              a {
                color: #28a745;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Hello ${firstName},</h2>
              <p>Thank you for applying for the <strong>${position}</strong> role at <strong>HirexBot</strong>!</p>
              <p>We’ve received your application and our team is currently reviewing it. If your profile aligns with our requirements, we’ll be in touch soon.</p>
              <p>Here’s what we received from you:</p>
              <div class="details">
                <p><strong>Name:</strong> ${firstName} ${lastName || ""}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Experience:</strong> ${experience} years</p>
                <p><strong>Cover Letter:</strong> ${message}</p>
              </div>
              <p>If you have any further queries, feel free to reply to this email.</p>
              <p>Warm regards,<br/>The HirexBot Team</p>
              <div class="footer">
                &copy; ${new Date().getFullYear()} HirexBot. All rights reserved.
              </div>
            </div>
          </body>
        </html>
      `,
    };

    try {
      await sgMail.send(mailToAdmin);
    } catch (error) {
      console.error("Failed to send career email to admin:", error);
    }

    try {
      await sgMail.send(mailToClient);
      
    } catch (error) {
      console.error("Failed to send confirmation to applicant:", error);
    }

    return res
      .status(200)
      .json({ message: "Application submitted successfully!" });
  } catch {
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    // Set up the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailToAdmin = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "New Inquiry from HirexBot Contact Form",
      html: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f7fa;
                }
                .container {
                  width: 100%;
                  padding: 20px;
                  background-color: #fff;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  border-radius: 8px;
                  max-width: 600px;
                  margin: 0 auto;
                }
                h3 {
                  color: #333;
                  font-size: 24px;
                  margin-bottom: 20px;
                }
                p {
                  font-size: 16px;
                  color: #666;
                  margin: 10px 0;
                  line-height: 1.5;
                }
                .details {
                  background-color: #f9f9f9;
                  padding: 20px;
                  border-radius: 8px;
                  margin-top: 20px;
                }
                .details p {
                  font-size: 14px;
                  color: #444;
                  margin-bottom: 8px;
                }
                .details p strong {
                  color: #333;
                  font-weight: bold;
                }
                .footer {
                  text-align: center;
                  margin-top: 20px;
                  font-size: 14px;
                  color: #aaa;
                }
                .btn {
                  display: inline-block;
                  padding: 12px 20px;
                  margin-top: 20px;
                  background-color: #28a745;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
                  text-align: center;
                }
                .btn:hover {
                  background-color: #218838;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h3>You have received a new inquiry from HirexBot!</h3>
                <p>A potential client has reached out to you via your contact form. Here are the details:</p>
                <div class="details">
                  <p><strong>Full Name:</strong> ${fullName}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                  <p><strong>Message:</strong></p>
                  <p>${message}</p>
                </div>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} HirexBot. All rights reserved.</p>
              </div>
            </body>
          </html>
        `,
    };
    const mailToClient = {
      from: process.env.EMAIL_USER, // from HirexBot
      to: email, // to the client
      subject: "We Received Your Message at HirexBot!",
      html: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f7fa;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  background-color: #fff;
                  margin: 30px auto;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h2 {
                  color: #333;
                  margin-bottom: 20px;
                }
                p {
                  font-size: 16px;
                  color: #555;
                  line-height: 1.6;
                }
                .details {
                  background-color: #f9f9f9;
                  padding: 15px;
                  margin-top: 15px;
                  border-left: 4px solid #28a745;
                }
                .footer {
                  margin-top: 30px;
                  text-align: center;
                  color: #aaa;
                  font-size: 14px;
                }
                a {
                  color: #28a745;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>Hello ${fullName},</h2>
                <p>Thank you for contacting <strong>HirexBot</strong>! We’ve received your message and our team will get back to you shortly.</p>
                <p>Here’s a copy of your message for your reference:</p>
                <div class="details">
                  <p><strong>Full Name:</strong> ${fullName}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                  <p><strong>Your Message:</strong> ${message}</p>
                </div>
                <p>If you have any urgent queries, feel free to reply to this email or contact us directly at <a href="mailto:contact@hirexbot.com">contact@hirexbot.com</a>.</p>
                <p>Looking forward to connecting with you!</p>
                <div class="footer">
                  &copy; ${new Date().getFullYear()} HirexBot. All rights reserved.
                </div>
              </div>
            </body>
          </html>
        `,
    };

    try {
      await sgMail.send(mailToAdmin);
    } catch (error) {
      console.error("Failed to send email to admin:", error);
    }

    try {
      await sgMail.send(mailToClient);
    } catch (error) {
      console.error("Failed to send email to client:", error);
    }
    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
