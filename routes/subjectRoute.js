import express from "express";
import { createSubject, deletSubject, getAllSubject, getSubject, updateSubject } from "../controllers/subjectController.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();


router.route("/createsubject").post(isAuthenticated, singleUpload, createSubject);

router.route("/subject").get(isAuthenticated, getAllSubject);
 

router
  .route("/subject/:id")
    .get(isAuthenticated, getSubject)
  .put(isAuthenticated, authorizeAdmin, updateSubject)
  .delete(isAuthenticated, authorizeAdmin, deletSubject);
  
  export default router;
