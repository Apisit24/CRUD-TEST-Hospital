import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/routes";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use("/api", routes);

app.listen(PORT, () => {
  mongoose.connect("mongodb://localhost:27017/crud-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
  console.log(`Server is running at http://localhost:${PORT}`);
});
