import express from "express";
import { changePassword, deleteUser, getCurrentUser, getUsers, googleLogin, loginUser, saveUser, sendOtp, validateUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.get("/getuser", getUsers);
userRouter.delete("/deleteuser/:email", deleteUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);
userRouter.get("/validate", validateUser);
userRouter.get("/currentuser", getCurrentUser);
userRouter.post("/sendotp", sendOtp);
userRouter.post("/changepassword", changePassword);

export default userRouter;