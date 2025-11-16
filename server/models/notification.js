import mongoose, { Schema } from "mongoose";

const noticeSchema = new Schema(
  {
    team: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    text: {
      type: String,
      required: true,
    },

    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      index: true,
    },

    notiType: {
      type: String,
      required: true,
      default: "alert",
      enum: ["alert", "message"],
    },

    isRead: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
