import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error : " + error);
  }
};

export default dbConnection;

export const createJWT = (res, userid) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure:true,
    sameSite: "none", //prevents CSRF attacks
    maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
  });
};
