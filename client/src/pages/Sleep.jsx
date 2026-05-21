import { useState } from "react";

import API from "../services/api";

export default function Sleep() {

  const [sleepHours,
    setSleepHours] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  // SAVE SLEEP DATA
  const saveSleep = async () => {

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

      // MERGE DATA
      const newData = {

        email: userEmail,

        calories:
          existing.data.calories || 0,

        sleep:
          Number(sleepHours),

        bmi:
          existing.data.bmi || 0,

        water:
          existing.data.water || 0,

        workout:
          existing.data.workout || "",

        duration:
          existing.data.duration || 0,

      };

      // SAVE TO DATABASE
      await API.post(
        "/health/add",
        newData
      );

      // SAVE LOCAL STORAGE
      localStorage.setItem(

        `${userEmail}_sleep`,

        sleepHours

      );

      setMessage(
        "Sleep Data Updated Successfully 🌙"
      );

      setSleepHours("");

    } catch (error) {

      console.log(error);

      setMessage(
        "Failed To Save Sleep Data"
      );

    }

  };

  return (

    <div className="min-h-screen bg-[#0A0A0A] text-white p-12">

      {/* HEADER */}
      <div className="mb-14">

        <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">

          Sleep Tracker

        </h1>

        <p className="text-gray-400 text-xl">

          Monitor sleep duration and wellness recovery in real time.

        </p>

      </div>

      {/* CARD */}
      <div className="max-w-3xl bg-[#111111] border border-white/10 rounded-[32px] p-10 shadow-2xl">

        <h2 className="text-3xl font-bold mb-10 text-white">

          Daily Sleep Analytics

        </h2>

        {/* INPUT */}
        <div className="mb-8">

          <label className="block text-gray-400 mb-3 text-lg">

            Sleep Hours

          </label>

          <input
            type="number"
            value={sleepHours}
            onChange={(e) =>
              setSleepHours(
                e.target.value
              )
            }
            placeholder="Enter sleep hours"
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 text-xl outline-none focus:border-green-500 transition-all duration-300"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={saveSleep}
          className="w-full bg-green-500 hover:bg-green-400 transition-all duration-300 py-5 rounded-2xl text-2xl font-bold"
        >

          Save Sleep Data

        </button>

        {/* MESSAGE */}
        {message && (

          <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-5">

            <p className="text-green-300 text-lg font-semibold">

              {message}

            </p>

          </div>

        )}

      </div>

    </div>

  );

}