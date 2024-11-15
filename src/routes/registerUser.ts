// This file is responsible for handling the registration of a new user.
import express from "express";
import prisma from "../db/prisma.js";
import { hashPassword } from "../utils/bcrypt.js";

const router = express.Router();

//create user
router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  let { password } = req.body;

  const hashedPassword = await hashPassword(password);
  password = hashedPassword;

  try {
    const user = await prisma.user.create({
      data: { name, email, password },
      select: { id: true, name: true, email: true },
    });
    res.json({ registered: true });
  } catch (error) {
    res.status(400).json({ error: "Unable to create user" });
  }
});

export { router };
