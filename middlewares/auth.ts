import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { expo } from "@better-auth/expo";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { SendEmail } from "../lib/sendEmail";
require("dotenv").config();

const mongoUrl = process.env.MONGO_URI;
console.log("Connecting to MongoDB at", mongoUrl);
if (!mongoUrl) {
  throw new Error("MONGO_URI environment variable is not defined");
}
const client = new MongoClient(mongoUrl);
const db = client.db();
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db),
  plugins: [
    expo(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Implement the sendVerificationOTP method to send the OTP to the user's email address
        SendEmail(email, otp);
      },
      expiresIn: 600,
      sendVerificationOnSignUp: true,
      allowedAttempts: 5,
    }),
  ],
  trustedOrigins: ["cyconnect://", "expo://", "*"],
});
console.log("MongoDB connection established");
