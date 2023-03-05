import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Question } from "../models/Question.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";

export const createQuestion = catchAsyncError(async (req, res, next) => {
  const {
    ques,
    quesImg,
    op1,
    op1Img,
    op2,
    op2Img,
    op3,
    op3Img,
    op4,
    op4Img,
    subjectId,
    chapterId,
    levelId,
    ans,
    desc,
  } = req.body;

  if (!question || !subjectId)
    return next(new ErrorHandler("Please enter all field", 400));

  const Cquestion = await Question.create({
    ques,
    quesImg,
    op1,
    op1Img,
    op2,
    op2Img,
    op3,
    op3Img,
    op4,
    op4Img,
    subjectId,
    chapterId,
    levelId,
    ans,
    desc,
    createdBy: {
      id: req.user._id,
      name: req.user.name,
    },
  });

  res.status(200).json({
    success: true,
    Cquestion,
    message: "Question Created Successfully",
  });
});

export const getAllQuestion = catchAsyncError(async (req, res, next) => {
  const Gquestion = await Question.find();

  res.status(200).json({
    success: true,
    Gquestion,
  });
});

export const getQuestion = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
  const Gsquestion = await Question.findById(id);

  res.status(200).json({
    success: true,
    Gsquestion,
  });
});

export const deletQuestion = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const DQuestion = await Question.findById(id);
  if (!DQuestion) {
    return res.status(400).json({
      success: false,
      message: `Question does not exist with Id: ${id}`,
    });
  }
  // console.log(subjectd);
  await DQuestion.remove();

  res.status(200).json({
    success: true,
    message: "Question Deleted Successfully",
  });
});
export const updateQuestion = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const {
    ques,
    quesImg,
    op1,
    op1Img,
    op2,
    op2Img,
    op3,
    op3Img,
    op4,
    op4Img,
    subjectId,
    chapterId,
    levelId,
    ans,
    desc,
  } = req.body;

  const Uquestion = await Question.findById(id);
  if (!Uquestion) {
    return res.status(400).json({
      success: false,
      message: `Question does not exist with Id: ${id}`,
    });
  }

  if (ques) Uquestion.ques = ques;
  if (subjectId) Uquestion.subjectId = subjectId;
  if (chapterId) Uquestion.chapterId = chapterId;
  if (quesImg) Uquestion.quesImg = quesImg;
  if (op1) Uquestion.op1 = op1;
  if (op1Img) Uquestion.op1Img = op1Img;
  if (op2) Uquestion.op2 = op2;
  if (op2Img) Uquestion.op2Img = op2Img;
  if (op3) Uquestion.op3 = op3;
  if (op4) Uquestion.op4 = op4;
  if (op3Img) Uquestion.op3Img = op3Img;
  if (op4Img) Uquestion.op4Img = op4Img;
  if (desc) Uquestion.desc = desc;
  if (ans) Uquestion.ans = ans;
  if (levelId) Uquestion.levelId = levelId;
  Uquestion.createdBy = {
    id: req.user._id,
    name: req.user.name,
  };

  await Uquestion.save();

  res.status(200).json({
    success: true,
    message: "Question Updated Successfully",
  });
});
