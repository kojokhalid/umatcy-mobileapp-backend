const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    AuthId: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ["student", "lecturer"], default: "student" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    avatar: String,
  },
  { timestamps: true }
);
const UsersModel = mongoose.model("User", userSchema);
module.exports = UsersModel;
