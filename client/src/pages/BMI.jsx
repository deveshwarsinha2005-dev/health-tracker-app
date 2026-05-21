import { useState } from "react";

import API from "../services/api";

export default function BMI() {

  const [weight,
    setWeight] =
    useState("");

  const [height,
    setHeight] =
    useState("");

  const [bmi,
    setBMI] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  // CALCULATE BMI
  const calculateBMI =
    async () => {

    try {

      if (!weight || !height) {

        alert(
          "Please enter weight and height"
        );

        return;

      }

      // CURRENT USER
      const loggedInUser =
        JSON.parse(
          localStorage.getItem(
            "loggedInUser"
          )
        );

      const userEmail =
        loggedInUser?.email;

      // BMI CALCULATION
      const heightInMeters =
        height / 100;

      const result =
        (
          weight /
          (
            heightInMeters *
            heightInMeters
          )
        ).toFixed(1);

      setBMI(result);

      // FETCH OLD DATA
      const existing =
        await API.get(
          `/health/latest/${userEmail}`
        );

      // MERGE DATA
      const newData = {

        email: userEmail,

        calories:
          existing.data.calories || 0,

        sleep:
          existing.data.sleep || 0,

        bmi:
          Number(result),

        water:
          existing.data.water || 0,

        workout:
          existing.data.workout || "",

        duration:
          existing.data.duration || 0,

      };

      // SAVE DATABASE
      await API.post(
        "/health/add",
        newData
      );

      // SAVE LOCAL STORAGE
      localStorage.setItem(

        `${userEmail}_bmi`,

        result

      );

      // BMI CATEGORY
      if (result < 18.5) {

        setCategory(
          "Underweight"
        );

      } else if (
        result >= 18.5 &&
        result < 25
      ) {

        setCategory(
          "Healthy"
        );

      } else if (
        result >= 25 &&
        result < 30
      ) {

        setCategory(
          "Overweight"
        );

      } else {

        setCategory(
          "Obese"
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Calculate BMI"
      );

    }

  };

  return (

    <div className="min-h-screen bg-[#0A0A0A] text-white p-12">

      {/* HEADER */}
      <div className="mb-14">

        <h1 className="text-6xl font-black tracking-tight text-white mb-4">

          BMI Analytics

        </h1>

        <p className="text-gray-400 text-xl">

          Calculate and monitor your body mass index in real time.

        </p>

      </div>

      {/* MAIN CARD */}
      <div className="max-w-3xl bg-[#111111] border border-white/10 rounded-[32px] p-10 shadow-2xl">

        <h2 className="text-3xl font-bold mb-10 text-white">

          Health Metrics

        </h2>

        {/* WEIGHT */}
        <div className="mb-6">

          <label className="block text-gray-400 mb-3 text-lg">

            Weight (kg)

          </label>

          <input
            type="number"
            value={weight}
            onChange={(e) =>
              setWeight(
                e.target.value
              )
            }
            placeholder="Enter weight"
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 text-xl outline-none focus:border-cyan-500 transition-all duration-300"
          />

        </div>

        {/* HEIGHT */}
        <div className="mb-10">

          <label className="block text-gray-400 mb-3 text-lg">

            Height (cm)

          </label>

          <input
            type="number"
            value={height}
            onChange={(e) =>
              setHeight(
                e.target.value
              )
            }
            placeholder="Enter height"
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 text-xl outline-none focus:border-cyan-500 transition-all duration-300"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={calculateBMI}
          className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 py-5 rounded-2xl text-2xl font-bold"
        >

          Calculate BMI

        </button>

        {/* RESULT */}
        {bmi && (

          <div className="mt-12 bg-[#161616] border border-white/10 rounded-3xl p-10">

            <p className="text-gray-400 text-lg mb-4">

              Current BMI Score

            </p>

            <h2 className="text-7xl font-black text-cyan-400 mb-6">

              {bmi}

            </h2>

            <div className="inline-block bg-cyan-500/10 border border-cyan-500/20 px-6 py-3 rounded-full">

              <p className="text-cyan-300 text-xl font-semibold">

                {category}

              </p>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}