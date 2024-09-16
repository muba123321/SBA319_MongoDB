import Activity from "../models/activityModel.js";

class ActivityServices {
  // create an acitvity controller creating new activities
  async createActivity(req, res) {
    try {
      const {
        title,
        description,
        type,
        date,
        time,
        access,
        onlineUrl,
        location,
        createdBy,
      } = req.body;
      const images = req.file
        ? `/uploads/${req.file.filename}`
        : "/uploads/activities.jpeg";
      const newActivity = new Activity({
        title,
        description,
        type,
        date,
        time,
        access,
        onlineUrl: access === "remote" ? onlineUrl : "No Url defined",
        location: access === "physical" ? location : "No address defined",
        createdBy,
        images,
      });
      const createdActivity = await newActivity.save();
      res.status(201).json({ createdActivity });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  //   funtction to get all activities
  async getAllActivities(req, res) {
    try {
      const activities = await Activity.find();
      // .populate("createdBy");
      res.status(200).json({ activities });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  //   function to get activity by ID
  async getActivityById(req, res) {
    try {
      const id = req.params.id;
      const activity = await Activity.findById(id);
      res.status(200).json({ activity });
    } catch (err) {
      res.status(500).json({ message: "Activity not found" });
    }
  }

  //   function to updateActivity
  async updateActivity(req, res) {
    try {
      const id = req.params.id;
      const {
        title,
        description,
        type,
        date,
        time,
        access,
        onlineUrl,
        location,
        createdBy,
      } = req.body;
      const images = req.file ? `/uploads/${req.file.filename}` : undefined;
      const updatedActivity = await Activity.findByIdAndUpdate(
        id,
        {
          title,
          description,
          type,
          date,
          time,
          access,
          onlineUrl: access === "remote" ? onlineUrl : "No Url defined",
          location: access === "physical" ? location : "No address defined",
          createdBy,
          images,
        },
        { new: true }
      );
      if (!updatedActivity)
        return res.status(404).json({ message: "Activity not found" });
      res.status(200).json(updatedActivity);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  //   function to delete an activity
  async deleteActivity(req, res) {
    try {
      const id = req.params.id;
      const deletedActivity = await Activity.findByIdAndDelete(id);
      if (!deletedActivity)
        return res.status(404).json({
          message: "Activity not found",
        });
      res.status(200).json({ message: "Activity deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  //   Function to add comment
  async addCommentToActivity(req, res) {
    try {
      const activityId = req.params.id;
      const { userID, comment, rating } = req.body;
      const updatedActivity = await Activity.findById(activityId);
      if (!updatedActivity)
        return res.status(404).json({ message: "Activity not found" });
      const newComment = new Comment({ userID, comment, rating });

      updatedActivity.comments.push(newComment);
      await updatedActivity.save();
      res.status(201).json({ message: "Comment added successfully", activity });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new ActivityServices();
