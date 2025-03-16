const express = require("express");
const { userRouter } = require("./routes/users");
const { coursesRouter } = require("./routes/courses");
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", coursesRouter);

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
