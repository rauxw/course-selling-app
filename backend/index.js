const express = require("express");
const { userRouter } = require("./routes/users");
const { coursesRouter } = require("./routes/courses");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use(express.json());

app.use("api/v1/user", userRouter);
app.use("api/v1/admin", adminRouter);
app.use("api/v1/course", coursesRouter);

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
