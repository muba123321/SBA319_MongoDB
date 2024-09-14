import mongoose from "mongoose";

const commentSchema = new mongoose({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["public", "private"],
    required: true,
  },
  location: {
    type: String,
    required: function () {
      return this.type === "public";
    },
  },
  onlineUrl: {
    type: String,
    required: function () {
      return this.type === "private";
    },
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  imageURL: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  ],
  status: {
    type: String,
    enum: ["ongoing", "completed"],
    default: "ongoing",
  },
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
