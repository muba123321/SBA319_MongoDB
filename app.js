import express from "express";
import dbConnection from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
