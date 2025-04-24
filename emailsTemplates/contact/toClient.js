// generateContactClientEmail.js
import "../../config/dotenv.js";

export default function generateContactClientEmail(data) {
  const { fullName, email, phone, message } = data;

  return {
    to: email,
    from: process.env.EMAIL_USER,
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
            <p>Warm regards,<br/>The HirexBot Team</p>
            <div class="footer">
              &copy; ${new Date().getFullYear()} HirexBot. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `,
  };
}
