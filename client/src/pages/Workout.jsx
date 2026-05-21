import { useState } from "react";

import API from "../services/api";

export default function Workout() {

  const [workout,
    setWorkout] =
    useState("");

  const [duration,
    setDuration] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  // SAVE WORKOUT
  const saveWorkout = async () => {

    try {

      // CURRENT USER
      const loggedInUser =
        JSON.parse(
          localStorage.getItem(
            "loggedInUser"
          )
        );

      const userEmail =
        loggedInUser?.email;

      // FETCH EXISTING DATA
      const existing =
        await API.get(
          `/health/latest/${userEmail}`
        );

      // MERGE OLD + NEW DATA
      const newData = {

        email: userEmail,

        calories:
          existing.data.calories || 0,

        sleep:
          existing.data.sleep || 0,

        bmi:
          existing.data.bmi || 0,

        water:
          existing.data.water || 0,

        // WORKOUT DATA
        workout: workout,

        duration:
          Number(duration),

      };

      // SAVE TO DATABASE
      await API.post(
        "/health/add",
        newData
      );

      // SAVE USER-SPECIFIC LOCAL STORAGE
      localStorage.setItem(

        `${userEmail}_workout`,

        workout

      );

      localStorage.setItem(

        `${userEmail}_duration`,

        duration

      );

      setMessage(
        "Workout Data Updated Successfully 💪"
      );

      // CLEAR INPUTS
      setWorkout("");

      setDuration("");

    } catch (error) {

      console.log(error);

      setMessage(
        "Failed To Save Workout Data"
      );

    }

  };

  return (

    <div className="min-h-screen bg-[#0A0A0A] text-white p-12">

      {/* HEADER */}
      <div className="mb-14">

        <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">

          Workout Tracker

        </h1>

        <p className="text-gray-400 text-xl">

          Monitor daily workouts and fitness activity in real time.

        </p>

      </div>

      {/* MAIN CARD */}
      <div className="max-w-3xl bg-[#111111] border border-white/10 rounded-[32px] p-10 shadow-2xl">

        <h2 className="text-3xl font-bold mb-10 text-white">

          Workout Analytics

        </h2>

        {/* WORKOUT NAME */}
        <div className="mb-8">

          <label className="block text-gray-400 mb-3 text-lg">

            Workout Name

          </label>

          <input
            type="text"
            value={workout}
            onChange={(e) =>
              setWorkout(
                e.target.value
              )
            }
            placeholder="Example: Chest Workout"
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 text-xl outline-none focus:border-purple-500 transition-all duration-300"
          />

        </div>

        {/* DURATION */}
        <div className="mb-8">

          <label className="block text-gray-400 mb-3 text-lg">

            Duration (minutes)

          </label>

          <input
            type="number"
            value={duration}
            onChange={(e) =>
              setDuration(
                e.target.value
              )
            }
            placeholder="Enter workout duration"
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 text-xl outline-none focus:border-pink-500 transition-all duration-300"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={saveWorkout}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 py-5 rounded-2xl text-2xl font-bold"
        >

          Save Workout Data

        </button>

        {/* MESSAGE */}
        {message && (

          <div className="mt-8 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5">

            <p className="text-purple-300 text-lg font-semibold">

              {message}

            </p>

          </div>

        )}

      </div>

    </div>

  );

}