const { Router } = require("express");

const coursesRouter = Router();

coursesRouter.post("/purchase", function (req, res) {
  res.json({
    message: "Your endpoint",
  });
});

coursesRouter.get("/courses", function (req, res) {
  res.json({
    message: "You courses",
  });
});

module.exports = {
  coursesRouter: coursesRouter,
};
