import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

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
        secondName: response.data.family_name,
        password: accessToken,
      });

      user
        .save()
        .then(() => {
          const userData = {
            mail: response.data.email,
            firstName: response.data.given_name,
            secondName: response.data.family_name,
            role: "user",
            phone: "Not given",
          };

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
