const mongoose = require("mongoose");

const healthSchema =
  new mongoose.Schema(

    {

      // USER EMAIL
      email: String,

      // USER ID
      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

      },

      // HEALTH DATA
      water: Number,

      calories: Number,

      sleep: Number,

      bmi: Number,

      workout: String,

      duration: Number,

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "Health",
    healthSchema
  );