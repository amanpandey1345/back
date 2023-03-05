import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    subject: {
      type: String,
      unique: true,
    },

    createdBy:
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },

  },
  { timestamps: true }
);

export const Subject = mongoose.model("Subject", schema);
