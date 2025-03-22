const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../models/db");
const JWT_KEY = process.env.JWT_ADMIN;
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { adminMiddleware } = require("../middlewares/admin");

adminRouter.post("/signup", async function (req, res) {
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
    await adminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
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

  const user = await adminModel.findOne({
    email: email,
  });

  const passwordMatch = await bcrypt.compare(password, user.password);

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

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.body;
  const { title, description, price, imageUrl, creatorId } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course Created",
    courseId: course._id,
  });
});

adminRouter.put("/course", function (req, res) {
  res.json({
    message: "Your updated course",
  });
});

adminRouter.get("/course/bulk", function (req, res) {
  res.json({
    message: "Your courses",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
