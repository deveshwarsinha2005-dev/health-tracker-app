import { useState, useEffect } from "react";

export default function Water() {

  const [waterIntake,
    setWaterIntake] =
    useState("");

  const [waterGoal,
    setWaterGoal] =
    useState("");

  // GET CURRENT USER
  const loggedInUser =
    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    );

  const userEmail =
    loggedInUser?.email;

  // LOAD USER DATA
  useEffect(() => {

    const savedWater =
      localStorage.getItem(
        `${userEmail}_waterIntake`
      );

    const savedGoal =
      localStorage.getItem(
        `${userEmail}_waterGoal`
      );

    if (savedWater) {

      setWaterIntake(
        savedWater
      );

    }

    if (savedGoal) {

      setWaterGoal(
        savedGoal
      );

    }

  }, [userEmail]);

  // SAVE WATER DATA
  const saveWaterData = () => {

    localStorage.setItem(

      `${userEmail}_waterIntake`,

      waterIntake

    );

    localStorage.setItem(

      `${userEmail}_waterGoal`,

      waterGoal

    );

    alert(
      "Water Data Saved 💧🔥"
    );

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-6xl font-black mb-10 text-cyan-400">

        Water Tracker 💧

      </h1>

      <div className="bg-white/10 border border-white/20 rounded-3xl p-10 max-w-2xl">

        <h2 className="text-3xl font-bold mb-8">

          Daily Water Tracking

        </h2>

        {/* WATER INTAKE */}
        <div className="mb-8">

          <label className="block text-xl mb-3 text-cyan-300">

            Water Intake (Litres)

          </label>

          <input
            type="number"
            step="0.1"
            value={waterIntake}
            onChange={(e) =>
              setWaterIntake(
                e.target.value
              )
            }
            placeholder="Enter water intake"
            className="w-full p-4 rounded-2xl bg-black border border-cyan-500 text-white text-xl"
          />

        </div>

        {/* WATER GOAL */}
        <div className="mb-8">

          <label className="block text-xl mb-3 text-cyan-300">

            Daily Water Goal (Litres)

          </label>

          <input
            type="number"
            step="0.1"
            value={waterGoal}
            onChange={(e) =>
              setWaterGoal(
                e.target.value
              )
            }
            placeholder="Set your daily goal"
            className="w-full p-4 rounded-2xl bg-black border border-cyan-500 text-white text-xl"
          />

        </div>

        {/* DISPLAY */}
        <div className="bg-cyan-500/10 border border-cyan-400 rounded-2xl p-6 mb-8">

          <p className="text-5xl font-black text-cyan-400 mb-3">

            {waterIntake || 0}L

          </p>

          <p className="text-gray-300 text-xl">

            Goal: {waterGoal || 0}L

          </p>

        </div>

        {/* BUTTON */}
        <button
          onClick={saveWaterData}
          className="w-full bg-cyan-500 hover:bg-cyan-400 py-4 rounded-2xl text-2xl font-bold"
        >

          Save Water Data 💧

        </button>

      </div>

    </div>

  );

}