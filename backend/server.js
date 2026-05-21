const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 😄");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${
          process.env.PORT || 5000
        }`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });