import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {

    chapter: {
      type: String,
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    createdBy:
      {
        id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name:{
          type:String,
          required: true,
        },
      }

  },
  { timestamps: true }
);

export const Chapter = mongoose.model("Chapter", schema);
