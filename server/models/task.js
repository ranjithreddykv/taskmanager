import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },

    date: { type: Date, default: Date.now },

    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
      index: true,
    },

    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
      index: true,
    },

    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "started",
            "in progress",
            "bug",
            "completed",
            "commented",
          ],
        },
        activity: String,
        date: { type: Date, default: Date.now },
        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],

    subTasks: [
      {
        title: { type: String },
        date: { type: Date, default: Date.now },
        tag: { type: String },
      },
    ],

    assets: [String],

    team: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],

    isTrashed: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
