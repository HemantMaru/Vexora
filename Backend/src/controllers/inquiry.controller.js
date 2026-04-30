import inquiryModel from "../models/inquiry.model.js";
import { sendEmail } from "../services/mail.service.js";
import { config } from "../config/config.js";
export const Inquiry = async (req, res) => {
  try {
    const { fullname, email, orderNumber, message } = req.body;
    const Messages = await inquiryModel.create({
      fullname,
      email,
      orderNumber,
      message,
    });
    await sendEmail({
      to: config.GOOGLE_USER,
      subject: "New Inquiry Received",
      html: `
  <div style="font-family: Arial; padding:20px; background:#f5f5f5;">
    <div style="max-width:500px; margin:auto; background:white; padding:20px; border-radius:10px;">
      
      <h2 style="color:#111;">New Inquiry 🚀</h2>

      <p><b>Name:</b> ${fullname}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Order No:</b> ${orderNumber}</p>

      <div style="margin-top:15px; padding:10px; background:#fafafa; border-left:4px solid black;">
        ${message}
      </div>

    </div>
  </div>
`,
    });

    res.status(201).json({
      success: true,
      message: "Inquiry sent successfully",
      Messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
