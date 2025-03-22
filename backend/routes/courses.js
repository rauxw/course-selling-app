const { Router } = require("express");
const { purchasesModel, courseModel } = require("../models/db");
const coursesRouter = Router();
const { userMiddleware } = require("../middlewares/user");

coursesRouter.post("/purchase", userMiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchasesModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "You have succesfully bought the course",
  });
});

coursesRouter.get("/preview", async function (req, res) {
  const courses = await courseModel.find({});
  res.json({
    message: "You courses preview",
    courses,
  });
});

module.exports = {
  coursesRouter: coursesRouter,
};
