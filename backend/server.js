const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const app = express();


// MIDDLEWARE
app.use(

  cors({

    origin: "http://localhost:5174",

    credentials: true,

  })

);
app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});


// CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 😄");
  })
  .catch((err) => {
    console.log(err);
  });


// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});