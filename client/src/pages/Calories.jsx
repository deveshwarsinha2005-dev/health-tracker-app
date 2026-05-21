import { useState } from "react";

import Sidebar from "../components/Sidebar";

import API from "../services/api";

export default function Calories() {

  const [calories, setCalories] =
    useState("");

  const [message, setMessage] =
    useState("");

  // SAVE CALORIES
  const saveCalories = async () => {

    console.log(
      "SAVE CLICKED 😄"
    );

    try {

      // CURRENT USER
      const loggedInUser =
        JSON.parse(
          localStorage.getItem(
            "loggedInUser"
          )
        );

      // VALIDATION
      if (!loggedInUser) {

        setMessage(
          "No Logged In User Found"
        );

        return;

      }

      const userEmail =
        loggedInUser.email;

      console.log(
        "USER EMAIL:",
        userEmail
      );

      // FETCH OLD DATA
      let existingData = {};

      try {

        const existing =
          await API.get(
            `/health/latest/${userEmail}`
          );

        existingData =
          existing.data || {};

        console.log(
          "OLD DATA:",
          existingData
        );

      } catch (fetchError) {

        console.log(
          "No Previous Data Found"
        );

      }

      // NEW DATA
      const newData = {

        email: userEmail,

        calories:
          Number(calories),

        sleep:
          existingData.sleep || 0,

        bmi:
          existingData.bmi || 0,

        water:
          existingData.water || 0,

        workout:
          existingData.workout || "",

        duration:
          existingData.duration || 0,

      };

      console.log(
        "SENDING:",
        newData
      );

      // SAVE TO BACKEND
      const response =
        await API.post(
          "/health/add",
          newData
        );

      console.log(
        "BACKEND RESPONSE:",
        response.data
      );

      // SAVE LOCAL STORAGE
      localStorage.setItem(

        `${userEmail}_calories`,

        calories

      );

      // SUCCESS
      setMessage(
        "Calories Updated Successfully 🔥"
      );

      // CLEAR INPUT
      setCalories("");

    } catch (error) {

      console.log(
        "FULL ERROR:",
        error
      );

      console.log(
        "ERROR RESPONSE:",
        error.response?.data
      );

      console.log(
        "ERROR MESSAGE:",
        error.message
      );

      setMessage(
        "Failed To Update Calories ❌"
      );

    }

  };

  return (

    <div className="min-h-screen bg-black text-white flex overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="ml-72 p-12 w-full relative">

        {/* BACKGROUND */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-3xl rounded-full"></div>

        {/* HEADER */}
        <div className="relative z-10 mb-14">

          <h1 className="text-7xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">

            Calories Tracker

          </h1>

          <p className="text-gray-400 text-xl">

            Monitor daily calorie burn and fitness activity in real time.

          </p>

        </div>

        {/* CARD */}
        <div className="relative z-10 max-w-3xl bg-[#111111] border border-white/10 rounded-[32px] p-10 shadow-2xl">

          <h2 className="text-3xl font-bold mb-10 text-white">

            Daily Calories Burned

          </h2>

          {/* INPUT */}
          <div className="mb-8">

            <label className="block text-gray-400 mb-3 text-lg">

              Calories

            </label>

            <input
              type="number"
              value={calories}
              onChange={(e) =>
                setCalories(
                  e.target.value
                )
              }
              placeholder="Enter calories burned"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 text-xl outline-none focus:border-orange-500 transition-all duration-300"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={saveCalories}
            className="w-full bg-orange-500 hover:bg-orange-400 transition-all duration-300 py-5 rounded-2xl text-2xl font-bold shadow-lg hover:shadow-orange-500/30"
          >

            Save Calories

          </button>

          {/* MESSAGE */}
          {message && (

            <div className="mt-8 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5">

              <p className="text-orange-300 text-lg font-semibold">

                {message}

              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}