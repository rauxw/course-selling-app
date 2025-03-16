require("dotenv").config();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const MONGO_URL = process.env.MONGO_DB;

mongoose.connect(MONGO_URL);

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const courseSchema = new Schema({
  title: { type: String, unique: true },
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});
const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchasesModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchasesModel,
};
