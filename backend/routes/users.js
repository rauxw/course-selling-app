require("dotenv").config();

const { Router } = require("express");
const userRouter = Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");
const { userModel, purchasesModel, courseModel } = require("../models/db");
const JWT_KEY = process.env.JWT_SECRET;

userRouter.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().min(6).max(65).email(),
    password: z.string().min(6).max(100),
    firstName: z.string().min(3).max(65),
    lastName: z.string().min(3).max(65),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Incorrect Format",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  const { email, password, firstName, lastName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e) {
    console.log(`Email Already Exists: ${email}`);
  }

  res.json({
    message: "You are signed up",
  });
});

userRouter.post("/signin", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().min(3).max(65).email(),
    password: z.string().min(3).max(100),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Incorrect Format",
      error: parsedDataWithSuccess.error,
    });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  const passwordMatch = bcrypt.compare(password, user.password);

  if (user && passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_KEY
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Forbidden client error response",
    });
  }
});

userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchasesModel.find({
    userId,
  });

  const courseData = await courseModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });

  res.json({
    message: "Your purchases",
    purchases,
    courseData,
  });
});

module.exports = {
  userRouter: userRouter,
};
