import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connect } from "./config/database.js";
import "dotenv/config";
const app = express();

//module imports
import Contacts from "./routes/contacts.js";

//DB connection
connect();

//Constants
const port = process.env.PORT || 4000;
const Url = "*";

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: Url,
  })
);

//Post Handling Routes
app.use("/contact", Contacts);

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Application port
app.listen(port, () => {
  console.log(`Server Running on port:${port}`);
});
