import express from "express";
import dbConnection from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js"
import "dotenv/config";
import path from 'path';

const app = express();
dbConnection();

const PORT = process.env.PORT;

app.use(express.json());
app.use(
    '/uploads', express.static(path.join(path.resolve(), 'uploads'))
);

app.use('/api', userRoutes);
app.use('/api', activityRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ActivityHub!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
