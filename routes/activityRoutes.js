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
router.patch(
  "/activities/:id",
  upload.single("images"),
  ActivityService.updateActivity
);
router.delete("/activities/:id", ActivityService.deleteActivity);
router.post("/activities/:id/comment", ActivityService.addCommentToActivity);
router.get("/activities/:id", ActivityService.getActivityById);

export default router;
