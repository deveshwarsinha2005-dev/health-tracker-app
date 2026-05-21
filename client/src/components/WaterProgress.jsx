import { useEffect, useState } from "react";

export default function WaterProgress() {

  // STATES
  const [waterIntake,
    setWaterIntake] =
    useState(0);

  const [targetWater,
    setTargetWater] =
    useState(4);

  // CURRENT USER
  const loggedInUser =
    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    );

  const userEmail =
    loggedInUser?.email;

  // LOAD USER DATA
  const loadWaterData =
    () => {

    const savedWater =
      Number(

        localStorage.getItem(
          `${userEmail}_waterIntake`
        )

      ) || 0;

    const savedGoal =
      Number(

        localStorage.getItem(
          `${userEmail}_waterGoal`
        )

      ) || 4;

    setWaterIntake(
      savedWater
    );

    setTargetWater(
      savedGoal
    );

  };

  // AUTO REFRESH
  useEffect(() => {

    loadWaterData();

    const interval =
      setInterval(() => {

        loadWaterData();

      }, 1500);

    return () =>
      clearInterval(interval);

  }, []);

  // CALCULATE PROGRESS
  const progress =
    Math.min(

      Math.round(
        (waterIntake /
          targetWater) *
          100
      ),

      100

    );

  return (

    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl mt-10 flex flex-col items-center hover:scale-[1.02] transition-all duration-300">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-white mb-3 text-center">

        Daily Water Intake

      </h2>

      {/* ICON */}
      <div className="text-5xl mb-5 animate-bounce">

        💧

      </div>

      {/* CIRCLE */}
      <div className="relative w-56 h-56">

        <svg className="w-56 h-56 rotate-[-90deg]">

          {/* BACKGROUND */}
          <circle
            cx="112"
            cy="112"
            r="95"
            stroke="#1E293B"
            strokeWidth="16"
            fill="transparent"
          />

          {/* PROGRESS */}
          <circle
            cx="112"
            cy="112"
            r="95"
            stroke="#06B6D4"
            strokeWidth="16"
            fill="transparent"
            strokeDasharray={597}
            strokeDashoffset={
              597 -

              (597 * progress) /
                100
            }
            strokeLinecap="round"
            className="transition-all duration-700"
          />

        </svg>

        {/* CENTER TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <p className="text-6xl font-extrabold text-cyan-400">

            {progress}%

          </p>

          <p className="text-gray-300 mt-2 text-lg">

            Completed

          </p>

        </div>

      </div>

      {/* DETAILS */}
      <div className="mt-6 text-center">

        <p className="text-2xl font-bold text-cyan-300">

          {waterIntake}L / {targetWater}L

        </p>

        <p className="text-gray-400 mt-2">

          Daily Goal Progress

        </p>

      </div>

    </div>

  );

}