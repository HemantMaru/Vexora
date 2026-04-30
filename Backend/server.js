import app from "./src/app.js";
import { MongooseConnect } from "./src/config/database.js";
MongooseConnect();
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
