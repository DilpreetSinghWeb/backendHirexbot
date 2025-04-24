// generateCareerAdminEmail.js
import "../../config/dotenv.js";

export default function generateCareerAdminEmail(data) {
  const { firstName, lastName, email, phone, position, experience, message } = data;
  
  return {
    to: process.env.EMAIL_USER,
    from: process.env.EMAIL_USER,
    replyTo: email, 
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
}
