import express from "express";
import { createLevel, deletLevel, getAllLevel, getLevel, updateLevel } from "../controllers/levelController.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();


router.route("/createlevel").post(isAuthenticated, singleUpload, createLevel);

router.route("/level").get(isAuthenticated, getAllLevel);
 

router
  .route("/level/:id")
    .get(isAuthenticated, getLevel)
  .put(isAuthenticated, authorizeAdmin, updateLevel)
  .delete(isAuthenticated, authorizeAdmin, deletLevel);
  
  export default router;
