const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    id: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    stream: { type: String, required: true },
    batch: { type: Number, required: true },
    sex: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
