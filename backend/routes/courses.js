const { Router } = require("express");
const { courseModel } = require("../models/db");
const coursesRouter = Router();

coursesRouter.post("/purchase", function (req, res) {
  res.json({
    message: "Your endpoint",
  });
});

coursesRouter.get("/preview", function (req, res) {
  res.json({
    message: "You courses preview",
  });
});

module.exports = {
  coursesRouter: coursesRouter,
};
