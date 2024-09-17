import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
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
    message: "Rating must be between 1 and 5",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.index({timestamp: 1})


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
  access: {
    type: String,
    enum: ["remote", "physical"],
    required: true,
  },
  location: {
    type: String,
    required: function () {
      return this.access === "physical";
    },
  },
  onlineUrl: {
    type: String,
    required: function () {
      return this.access === "remote";
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
  images: {
    type: String,
    default: "/uploads/activities.jpeg"
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
    enum: ["upcoming","ongoing", "completed"],
    default: "upcoming",
  },
  comments: [commentSchema],
});
activitySchema.index({title: 1})
activitySchema.index({date: 1})
activitySchema.index({time: 1})
activitySchema.index({ status: 1, date: -1 });

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
