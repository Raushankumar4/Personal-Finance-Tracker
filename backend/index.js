const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./db/db");

dotenv.config();

const PORT = process.env.PORT || "3000";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running on PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
