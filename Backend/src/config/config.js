import { configDotenv } from "dotenv";
configDotenv();
if (!process.env.MONGO_URI) {
  throw new Error("Mongo_URI is not defined in environment variable");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variable");
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error(
    "IMAGEKIT_PRIVATE_KEY is not defined in environment variable",
  );
}
if (!process.env.GOOGLE_PASSWORD) {
  throw new Error("GOOGLE_PASSWORD is not defined in environment variable");
}
if (!process.env.GOOGLE_USER) {
  throw new Error("GOOGLE_USER is not defined in environment variable");
}
if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL is not defined in environment variable");
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
  GOOGLE_USER: process.env.GOOGLE_USER,
  CLIENT_URL: process.env.CLIENT_URL,
};
