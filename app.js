import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
  path: "./config/config.env",
});
const app = express();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use( 
  express.urlencoded({
    extended: true,  
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


import user from "./routes/userRoutes.js";
import subject from "./routes/subjectRoute.js";
import chapter from "./routes/chapterRoute.js";
import level from "./routes/levelRoutes.js";
import question from "./routes/questionRoute.js";


app.use("/api/v1", user);
app.use("/api/v1", subject);
app.use("/api/v1", chapter);
app.use("/api/v1", level);
app.use("/api/v1", question);



export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);
    
app.use(ErrorMiddleware);
