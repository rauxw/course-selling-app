const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../models/db");

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "You are signed up",
  });
});

adminRouter.post("/signin", function (req, res) {
  res.json({ message: "You are Signed in" });
});

adminRouter.post("/", function (req, res) {
  res.json({
    message: "Your updated course",
  });
});

adminRouter.put("/", function (req, res) {
  res.json({
    message: "Your updated course",
  });
});

adminRouter.get("/bulk", function (req, res) {
  res.json({
    message: "Your updated course",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
