import "../../config/dotenv.js"

export default function generateCareerClientEmail(data) {
    const { firstName, lastName, email, phone, position, experience, message } = data;
    return {
      to: email,
      from: process.env.EMAIL_USER,
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
  };
  