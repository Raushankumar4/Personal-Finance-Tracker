const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected SuccessFully ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Something went while connecting db${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
