const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", function (req, res) {
  res.json({
    message: "You are signed up",
  });
});

userRouter.post("/signin", function (req, res) {
  res.json({ message: "You are Signed in" });
});

userRouter.get("/course", function (req, res) {
  res.json({
    message: "Your courses",
  });
});

module.exports = {
  userRouter: userRouter,
};
