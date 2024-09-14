import express from "express";
import dbConnection from "./config/db.js";
import "dotenv/config";

const app = express();
dbConnection();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
