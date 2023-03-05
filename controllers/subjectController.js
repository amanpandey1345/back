import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Subject } from "../models/subject.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";

export const createSubject = catchAsyncError(async (req, res, next) => {
  const { subject } = req.body;

  if (!subject) return next(new ErrorHandler("Please enter all field", 400));

  const Csubject = await Subject.create({
    subject,

    createdBy: {
      id: req.user._id,
      name: req.user.name,
    },
  });

  res.status(200).json({
    success: true,
    Csubject,
    message: "Subject Created Successfully",
  });
});

export const getAllSubject = catchAsyncError(async (req, res, next) => {
  const Gsubject = await Subject.find();

  res.status(200).json({
    success: true,
    Gsubject,
  });
});
export const getSubject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const Gssubject = await Subject.findById(id);

  res.status(200).json({
    success: true,
    Gssubject,
  });
});

export const deletSubject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const Dsubject = await Subject.findById(id);
  if (!Dsubject) {
    return res.status(400).json({
      success: false,
      message: `subject does not exist with Id: ${id}`,
    });
  }
  // console.log(subjectd);
  await Dsubject.remove();

  res.status(200).json({
    success: true,
    message: "Subject Deleted Successfully",
  });
});
export const updateSubject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { subject } = req.body;

  const Usubject = await Subject.findById(id);

  if (subject) Usubject.subject = subject;
  Usubject.createdBy = {
    id: req.user._id,
    name: req.user.name,
  };

  await Usubject.save();

  res.status(200).json({
    success: true,
    message: "Subject Updated Successfully",
  });
});
