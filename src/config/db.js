

import mongoose from 'mongoose'

mongoose.set('strictQuery', true);
const connectDB = async (mongoDBURL) => {
  try {
      const conn = await mongoose.connect(mongoDBURL)
      console.log(`MongoDB Connected.....${conn}`)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB