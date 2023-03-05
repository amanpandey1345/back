import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Level } from "../models/Level.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";

export const createLevel = catchAsyncError(async (req, res, next) => {
  const { level,subjectId,chapterId } = req.body;

  if (!level || !subjectId) return next(new ErrorHandler("Please enter all field", 400));

  const Clevel = await Level.create({
    level,
    subjectId,
    chapterId,
    createdBy: {
      id: req.user._id,
      name: req.user.name,
    },
  });

  res.status(200).json({
    success: true,
    Clevel,
    message: "Level Created Successfully",
  });
});

export const getAllLevel = catchAsyncError(async (req, res, next) => {
  const Glevel = await Level.find();

  res.status(200).json({
    success: true,
    Glevel,
  });
});
export const getLevel = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
  const Gslevel = await Level.findById(id);

  res.status(200).json({
    success: true,
    Gslevel,
  });
});

export const deletLevel = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const DLevel = await Level.findById(id);
  if (!DLevel) {
    return res.status(400).json({
      success: false,
      message: `Level does not exist with Id: ${id}`,
    });
  }
  // console.log(subjectd);
  await DLevel.remove();

  res.status(200).json({
    success: true,
    message: "Level Deleted Successfully",
  });
});
export const updateLevel = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { level,subjectId,chapterId } = req.body;

  const Ulevel = await Level.findById(id);
  if (!Ulevel) {
    return res.status(400).json({
      success: false,
      message: `Level does not exist with Id: ${id}`,
    })};

  if (level) Ulevel.level = level;
  if (subjectId) Ulevel.subjectId = subjectId;
  if (chapterId) Ulevel.chapterId = chapterId;
  Ulevel.createdBy = { 
    id: req.user._id,
    name: req.user.name,
  };

  await Ulevel.save();

  res.status(200).json({
    success: true,
    message: "Level Updated Successfully",
  });
});
