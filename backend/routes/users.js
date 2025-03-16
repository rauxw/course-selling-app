function createUserRoutes(app) {
  app.post("/user/signup", function (req, res) {
    res.json({
      message: "You are signed up",
    });
  });
}

userRouter.post("/signin", function (req, res) {
  res.json({ message: "You are Signed in" });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Your purchases",
  });
});

module.exports = {
  userRouter: userRouter,
};
