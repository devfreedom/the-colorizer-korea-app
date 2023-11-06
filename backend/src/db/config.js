import mongoose from "mongoose";
import { UserModel } from "./models/userModel.js";
import { UserSchema } from "./schemas/userSchema.js";

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "MongoDB Atlas connection string is missing. ";

mongoose.connect(MONGODB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("" + DB_URL)
);

db.on("error", (error) =>
  console.error(
    `Couldn't connect to MongoDB Database. \n 
     MongoDB URL: ${MONGODB_URL} \n 
     Error: ${error}`)
);
 
export { UserModel, UserSchema };
