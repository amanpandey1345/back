import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Chapter } from "../models/Chapter.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";

export const createChapter = catchAsyncError(async (req, res, next) => {
  const { chapter,subjectId } = req.body;

  if (!chapter || !subjectId) return next(new ErrorHandler("Please enter all field", 400));

  const Cchapter = await Chapter.create({
    chapter,
    subjectId,
    createdBy: {
      id: req.user._id,
      name: req.user.name,
    },
  });

  res.status(200).json({
    success: true,
    Cchapter,
    message: "Chapter Created Successfully",
  });
});

export const getAllChapter = catchAsyncError(async (req, res, next) => {
  const Gchapter = await Chapter.find();

  res.status(200).json({
    success: true,
    Gchapter,
  });
});
export const getChapter = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
  const Gschapter = await Chapter.findById(id);

  res.status(200).json({
    success: true,
    Gschapter,
  });
});

export const deletChapter = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const DChapter = await Chapter.findById(id);
  if (!DChapter) {
    return res.status(400).json({
      success: false,
      message: `Chapter does not exist with Id: ${id}`,
    });
  }
  // console.log(subjectd);
  await DChapter.remove();

  res.status(200).json({
    success: true,
    message: "Chapter Deleted Successfully",
  });
});
export const updateChapter = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { chapter,subjectId } = req.body;

  const Uchapter = await Chapter.findById(id);
  if (!Uchapter) {
    return res.status(400).json({
      success: false,
      message: `Chapter does not exist with Id: ${id}`,
    })};

  if (chapter) Uchapter.chapter = chapter;
  if (subjectId) Uchapter.subjectId = subjectId;
  Uchapter.createdBy = { 
    id: req.user._id,
    name: req.user.name,
  };

  await Uchapter.save();

  res.status(200).json({
    success: true,
    message: "Chapter Updated Successfully",
  });
});
