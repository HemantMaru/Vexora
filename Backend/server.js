import { configDotenv } from "dotenv";
configDotenv();
import app from "./src/app.js";
const PORT = process.env.PORT || 3000;
import { MongooseConnect } from "./src/config/database.js";
MongooseConnect();
app.listen(PORT, () => {
  console.log("server is running on port" + PORT);
});
