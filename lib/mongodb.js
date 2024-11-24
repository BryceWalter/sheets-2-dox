import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('COnnected to mongo')
  } catch (error) {
    console.log('Error connecting to mongo ', error)
  }
}