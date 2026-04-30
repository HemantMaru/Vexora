import userModel from "../models/auth.models.js";
import subscribeModel from "../models/subscribe.model.js";
import { sendEmail } from "../services/mail.service.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    // const user = req.user;

    const userEmail = await subscribeModel.findOne({ email });
    if (userEmail) {
      return res.status(400).json({
        message: "you already subscribed with this email",
      });
    }

    // if (email !== user.email) {
    //   return res.status(401).json({
    //     message: "Please use your registered email",
    //   });
    // }
    const subscribe = await subscribeModel.create({
      email,
    });

    await sendEmail({
      to: subscribe.email,
      subject: "Welcome to Snitch Club 🔥",
      html: `
    <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:30px;">
      
      <div style="max-width:500px; margin:auto; background:#ffffff; padding:25px; border-radius:10px; text-align:center;">
        
        <h1 style="color:#111; letter-spacing:1px;">WELCOME 🔥</h1>
        
        <p style="font-size:14px; color:#555; margin-top:10px;">
          You’ve successfully joined the Snitch Club.
        </p>

        <p style="font-size:13px; color:#777; margin-top:20px;">
          Get ready for exclusive drops, early access & special offers.
        </p>

        <div style="margin:25px 0;">
          <a href="http://localhost:5173"
            style="padding:12px 25px; background:#111; color:#fff; text-decoration:none; border-radius:6px; font-size:13px;">
            Explore Now
          </a>
        </div>

        <p style="font-size:12px; color:#aaa;">
          If you didn’t subscribe, you can ignore this email.
        </p>

      </div>

    </div>
  `,
    });
    res.status(201).json({
      message: "Subscribed Successfully",
      success: true,
      subscribe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
