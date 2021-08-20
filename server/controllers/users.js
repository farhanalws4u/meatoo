import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signUp = async (req, res) => {
  const { email, password, fullName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "user already exist." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (e) {
    res.status(500).json({ message: "something went wrong." });
  }
};
