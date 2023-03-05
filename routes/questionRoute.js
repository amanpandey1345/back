import express from "express";
import { createQuestion, deletQuestion, getAllQuestion, getQuestion, updateQuestion } from "../controllers/questionController.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();


router.route("/createquestion").post(isAuthenticated, singleUpload, createQuestion);

router.route("/question").get(isAuthenticated, getAllQuestion);
 

router
  .route("/question/:id")
    .get(isAuthenticated, getQuestion)
  .put(isAuthenticated, authorizeAdmin, updateQuestion)
  .delete(isAuthenticated, authorizeAdmin, deletQuestion);
  
  export default router;