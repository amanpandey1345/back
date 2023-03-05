import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    ques: {
      type: String,
      required: true,
    },
    quesImg: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    op1: {
      type: String,
      required: true,
    },
    op1Img: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    op2: {
      type: String,
      required: true,
    },
    op2Img: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    op3: {
      type: String,
      required: true,
    },
    op3Img: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    op4: {
      type: String,
      required: true,
    },
    op4Img: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    ans: {
      type: String,
      required: true,
    },

    desc: {
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
    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
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

export const Question = mongoose.model("Question", schema);
