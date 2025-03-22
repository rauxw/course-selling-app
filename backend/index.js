require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_DB;

const { userRouter } = require("./routes/users");
const { coursesRouter } = require("./routes/courses");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", coursesRouter);

async function main() {
  await mongoose.connect(MONGO_URL);
  app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
  });
}

main();
