const express = require("express");

const router = express.Router();

const Health = require("../models/Health");


// ADD HEALTH DATA
router.post("/add", async (req, res) => {

  try {

    const {

      email,
      calories,
      sleep,
      bmi,
      water,
      workout,
      duration,

    } = req.body;

    // CREATE NEW ENTRY EVERY TIME
    const newHealth =
      new Health({

        email,
        calories,
        sleep,
        bmi,
        water,
        workout,
        duration,

      });

    await newHealth.save();

    res.status(201).json({
      message:
        "Health Data Saved",
      data: newHealth,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed To Save Health Data",
    });

  }

});


// GET LATEST USER DATA
router.get("/latest/:email", async (req, res) => {

  try {

    const latest =
      await Health.findOne({

        email:
          req.params.email,

      }).sort({

        createdAt: -1,

      });

    res.json(latest || {});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed To Fetch Latest Data",
    });

  }

});


// GET ALL USER DATA
router.get("/all/:email", async (req, res) => {

  try {

    const allData =
      await Health.find({

        email:
          req.params.email,

      }).sort({

        createdAt: 1,

      });

    res.json(allData);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed To Fetch Chart Data",
    });

  }

});

module.exports = router;