import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import nodemailer from "nodemailer";
import Otp from "../models/otp.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function saveUser(req, res) {
  if (req.body.role == "admin") {
    if (req.user == null) {
      res.status(403).json({
        message: "Please login as Admin brefore creating an admin account!...",
      });

      return;
    }

    if (req.user.role != "admin") {
      res.status(403).json({
        message: "You are not authorized create an admin account",
      });

      return;
    }
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    password: hashedPassword,
    role: req.body.role,
    phone: req.body.phone,
  });

  user
    .save()
    .then(() => {
      res.json({
        message: "User Saved Successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "User Save Failed!...",
      });
    });
}

export function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email: email,
  }).then((user) => {
    if (user == null) {
      res.status(404).json({
        message: "Invalid email",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (isPasswordCorrect) {
        const userData = {
          email: user.email,
          _id: user._id,
          firstName: user.firstName,
          secondName: user.secondName,
          role: user.role,
          phone: user.phone,
        };

        const token = jwt.sign(userData, process.env.JWT_KEY);

        res.json({
          message: "Login Successful",
          token: token,
          user: userData,
        });
      } else {
        res.status(403).json({
          message: "Invalid password",
        });
      }
    }
  });
}

export async function googleLogin(req, res) {
  const accessToken = req.body.accessToken;

  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    console.log(response);

    const user = await User.findOne({
      email: response.data.email,
    });

    if (user == null) {
      const user = new User({
        email: response.data.email,
        firstName: response.data.given_name,
        secondName: response.data.family_name || "Not given",
        password: accessToken,
      });

      user
        .save()
        .then((savedUser) => {
          const userData = {
            email: savedUser.email,
            _id: savedUser._id,
            firstName: savedUser.firstName,
            secondName: savedUser.secondName,
            role: savedUser.role,
            phone: savedUser.phone,
          };

          console.log(savedUser);

          const token = jwt.sign(userData, process.env.JWT_KEY);
          res.json({
            message: "User saved Successfully",
            token: token,
            user: userData,
          });
        })
        .catch(() => {
          res.json({
            message: "User Save Failed!...",
          });
        });
    } else {
      const userData = {
        email: user.email,
        _id: user._id,
        firstName: user.firstName,
        secondName: user.secondName,
        role: user.role,
        phone: user.phone,
      };

      const token = jwt.sign(userData, process.env.JWT_KEY);

      res.json({
        message: "Login Successful",
        token: token,
        user: userData,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function validateUser(req, res) {
  if (!req.user) {
    res.status(404).json({
      message: "please login!",
    });
    return;
  }

  res.json({
    user: req.user,
  });
}

export function getUsers(req, res) {
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  if (req.user.role == "admin") {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch(() => {
        res.status(500).json({
          message: "Users not found",
        });
      });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}

export function deleteUser(req, res) {
  if (req.user.role != "admin") {
    res.status(403).json({
      message: "You are not authorized to delete a product!",
    });

    return;
  }

  User.findOneAndDelete({
    email: req.params.email,
  })
    .then(() => {
      res.json({
        message: "Product deleted successfully!",
      });
    })
    .catch(() => {
      () => {
        res.status(500).json({
          message: "Failed to delete product!",
        });
      };
    });
}

export function getCurrentUser(req, res) {
  if (req.user == null) {
    res.status(403).json({
      message: "Please login to get user details",
    });
    return;
  }
  res.json({
    user: req.user,
  });
}

export function sendOtp(req, res) {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const newOtp = new Otp({
      email: email,
      otp: otp,
    });

    Otp.findOneAndUpdate(
      { email: email },
      {
        otp: otp,
        createdAt: new Date(),
      },
      { new: true, upsert: true }
    )
      .then(() => {
        console.log("OTP saved successfully");
      })
      .catch((error) => {
        console.error("Error saving OTP:", error.message);
      });

    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code for Verification.",
      text: `Your OTP code is ${otp}. It will expire in 2 minutes.`,
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error("Error sending OTP:", error.message);
        return res.status(500).json({
          message: "Failed to send OTP",
          error: error.message,
        });
      }

      console.log(`OTP sent to ${email}: ${otp}`);

      return res.status(200).json({
        message: "OTP sent successfully",
      });
    });
  } catch (err) {
    console.error("Unexpected error in sendOtp:", err.message);
    return res.status(500).json({
      message: "Server error while sending OTP",
      error: err.message,
    });
  }
}

export function changePassword(req, res) {
  const email = req.body.email;
  const password = req.body.newPassword;
  const otp = req.body.otp;

  if (!email || !password || !otp) {
    return res.status(400).json({
      message: "Email, password, and OTP are required",
    });
  }

  Otp.findOne({ email: email, otp: otp })
    .then((otpRecord) => {
      if (!otpRecord) {
        return res.status(400).json({
          message: "Invalid OTP",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      // If OTP is valid, update the user's password
      User.findOneAndUpdate(
        { email: email },
        { password: hashedPassword },
        { new: true }
      )
        .then(() => {
          Otp.deleteMany({ email: email });
          res.json({
            message: "Password changed successfully",
          });
        })
        .catch(() => {
          res.status(500).json({
            message: "Failed to change password",
          });
        });
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed to verify OTP",
      });
    });
}
