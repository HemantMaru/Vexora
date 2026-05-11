import {
  authLogin,
  authRegister,
  getme,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validation/auth.validator.js";
import { authenticateUser } from "../middleware/auth.middlware.js";
import { searchHistory } from "../controllers/product.controller.js";
import passport from "passport";
const authRoutes = Router();

authRoutes.post("/register", validateRegisterUser, authRegister);
authRoutes.post("/login", validateLoginUser, authLogin);
authRoutes.get("/", authenticateUser, getme);

// authRoutes.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] }),
// );

//  Step 2: Callback
// authRoutes.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     const token = jwt.sign(
//       {
//         id: req.user._id,
//         email: req.user.email,
//       },
//       config.JWT_SECRET,
//       { expiresIn: "5d" },
//     );

//     //  same cookie system
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false, //  DEV ke liye false
//       sameSite: "lax",
//       maxAge: 5 * 24 * 60 * 60 * 1000,
//     });

//     //  redirect frontend
//     res.redirect(process.env.CLIENT_URL);
//   },
// );

export default authRoutes;
