import { useEffect, useState } from "react";

export default function Profile() {

  // CURRENT USER
  const loggedInUser =
    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    );

  const userEmail =
    loggedInUser?.email;

  const [profile,
    setProfile] =
    useState({

      name:
        loggedInUser?.name ||
        "User",

      email:
        loggedInUser?.email ||
        "user@gmail.com",

      bmi:
        localStorage.getItem(
          `${userEmail}_bmi`
        ) || 0,

      water:
        localStorage.getItem(
          `${userEmail}_waterIntake`
        ) || 0,

      sleep:
        localStorage.getItem(
          `${userEmail}_sleep`
        ) || 0,

      workout:
        localStorage.getItem(
          `${userEmail}_workout`
        ) || "None",

    });

  // REFRESH PROFILE
  useEffect(() => {

    setProfile({

      name:
        loggedInUser?.name ||
        "User",

      email:
        loggedInUser?.email ||
        "user@gmail.com",

      bmi:
        localStorage.getItem(
          `${userEmail}_bmi`
        ) || 0,

      water:
        localStorage.getItem(
          `${userEmail}_waterIntake`
        ) || 0,

      sleep:
        localStorage.getItem(
          `${userEmail}_sleep`
        ) || 0,

      workout:
        localStorage.getItem(
          `${userEmail}_workout`
        ) || "None",

    });

  }, [userEmail]);

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden relative p-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full"></div>

      {/* HEADER */}
      <div className="relative z-10 mb-14">

        <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">

          Profile Dashboard

        </h1>

        <p className="text-gray-400 text-xl">

          Personalized wellness overview and health insights.

        </p>

      </div>

      {/* PROFILE CARD */}
      <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-10 shadow-2xl max-w-6xl">

        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center">

            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400"
              alt="profile"
              className="w-52 h-52 rounded-full border-4 border-cyan-400 shadow-2xl"
            />

            <div className="mt-6 text-center">

              <h2 className="text-4xl font-black">

                {profile.name}

              </h2>

              <p className="text-gray-400 mt-2 text-lg">

                Premium Wellness Member

              </p>

            </div>

          </div>

          {/* PROFILE DETAILS */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* EMAIL */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400 mb-3">

                Email

              </p>

              <h3 className="text-2xl font-bold break-all">

                {profile.email}

              </h3>

            </div>

            {/* BMI */}
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-3xl p-8">

              <p className="text-pink-300 mb-3">

                BMI Score

              </p>

              <h3 className="text-5xl font-black text-pink-400">

                {profile.bmi}

              </h3>

            </div>

            {/* WATER */}
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8">

              <p className="text-cyan-300 mb-3">

                Water Intake

              </p>

              <h3 className="text-5xl font-black text-cyan-400">

                {profile.water}L

              </h3>

            </div>

            {/* SLEEP */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8">

              <p className="text-green-300 mb-3">

                Sleep Hours

              </p>

              <h3 className="text-5xl font-black text-green-400">

                {profile.sleep}h

              </h3>

            </div>

            {/* WORKOUT */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-8 md:col-span-2">

              <p className="text-purple-300 mb-3">

                Active Workout

              </p>

              <h3 className="text-4xl font-black text-purple-400">

                {profile.workout}

              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* HEALTH STATUS */}
      <div className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* STATUS CARD */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-green-400 mb-4">

            Wellness Status

          </h2>

          <p className="text-gray-300 text-lg">

            Health metrics are actively being monitored and updated in realtime.

          </p>

        </div>

        {/* PERFORMANCE */}
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-cyan-400 mb-4">

            Performance

          </h2>

          <p className="text-gray-300 text-lg">

            Daily analytics and health tracking systems are functioning optimally.

          </p>

        </div>

        {/* ACTIVITY */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-purple-400 mb-4">

            Activity Tracking

          </h2>

          <p className="text-gray-300 text-lg">

            Workout, hydration and wellness data synchronized successfully.

          </p>

        </div>

      </div>

    </div>

  );

}