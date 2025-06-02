// generateContactAdminEmail.js
import "../../config/dotenv.js";

export default function generateContactAdminEmail(data) {
  const { fullName, email, phone, message } = data;

  return {
    from: process.env.HOSTINGER_EMAIL_CONTACT,
    to: process.env.HOSTINGER_EMAIL_CONTACT,
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
}
