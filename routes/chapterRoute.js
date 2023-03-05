import express from "express";
import {
  createChapter,
  deletChapter,
  getAllChapter,
  getChapter,
  updateChapter,
} from "../controllers/chapterController.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router
  .route("/createchapter")
  .post(isAuthenticated, singleUpload, createChapter);

router.route("/chapter").get(isAuthenticated, getAllChapter);

router
  .route("/chapter/:id")
  .get(isAuthenticated, getChapter)
  .put(isAuthenticated, authorizeAdmin, updateChapter)
  .delete(isAuthenticated, authorizeAdmin, deletChapter);

export default router;
