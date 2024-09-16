import express from "express";
import ActivityService from "../controllers/activityController.js";
import upload from "../config/uploadConfig.js";

const router = express.Router();

router.post(
  "/activities",
  upload.single("images"),
  ActivityService.createActivity
);
router.get("/activities", ActivityService.getAllActivities);
router.get("/activities/:id", ActivityService.getActivityById);
router.patch(
  "/activities/:id",
  upload.single("images"),
  ActivityService.updateActivity
);
router.delete("/activities/:id", ActivityService.deleteActivity);
router.post("/activities/:id/comment", ActivityService.addCommentToActivity);

export default router;
