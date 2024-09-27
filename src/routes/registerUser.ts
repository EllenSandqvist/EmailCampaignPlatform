// This file is responsible for handling the registration of a new user.
import express from "express";
import prisma from "../db/prisma.js";

const router = express.Router();

//create user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password },
      select: { id: true, name: true, email: true },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Unable to create user" });
  }
});

export { router };
