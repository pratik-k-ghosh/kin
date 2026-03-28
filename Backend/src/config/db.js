import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch(() => {
      console.log("Database Failed to Connect");
      process.exit(1);
    });
};
