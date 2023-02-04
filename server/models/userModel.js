const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    userType: { type: String, required: true },
    department: { type: String, required: true },
    stream: { type: String, required: true },
    id: { type: String, required: true},//, unique: true 
    batch: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    approved: { type: Boolean, default: true }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
