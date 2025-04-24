import sendCareerEmails from "../utils/sendCareerEmails.js";
import sendContactEmails from "../utils/sendContactEmail.js";

export const CareersController = async (req, res) => {
  const { firstName, lastName, email, phone, position, experience, message } =
    req.body;

  if (!firstName || !email || !position || !experience || !message) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields." });
  }

  try {
    await sendCareerEmails({
      firstName,
      lastName,
      email,
      phone,
      position,
      experience,
      message,
    });
    return res
      .status(200)
      .json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error("Error processing career application:", err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

export const ContactsController = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const contactData = { fullName, email, phone, message };

    await sendContactEmails(contactData);

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
