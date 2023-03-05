import mongoose from "mongoose";

const schema = new mongoose.Schema({

  level: {
      type: String,
      required: true,
    },

    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
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

// export default mongoose.model("Topic", schema);
export const Level = mongoose.model("Level", schema);
