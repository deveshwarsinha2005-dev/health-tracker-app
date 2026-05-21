import Sidebar from "../components/Sidebar";
import HealthChart from "../components/HealthChart";
import WaterProgress from "../components/WaterProgress";
import Navbar from "../components/Navbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import API from "../services/api";

export default function Dashboard() {

  // CURRENT USER
  const loggedInUser =
    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    );

  const userEmail =
    loggedInUser?.email || "";

  // MAIN HEALTH DATA
  const [healthData,
    setHealthData] =
    useState({

      calories: 0,
      sleep: 0,
      bmi: 0,
      workout: "None",
      duration: 0,

    });

  // WATER
  const [waterIntake,
    setWaterIntake] =
    useState(0);

  // SLEEP GRAPH
  const [sleepGraph,
    setSleepGraph] =
    useState([]);

  // WORKOUT GRAPH
  const [workoutGraph,
    setWorkoutGraph] =
    useState([]);

  // FETCH USER DATA
  const fetchHealthData =
    async () => {

    try {

      // NO USER
      if (!userEmail) return;

      const res =
        await API.get(
          `/health/latest/${userEmail}`
        );

      const data =
        res?.data || {};

      // USER-SPECIFIC VALUES
      const currentCalories =
        Number(
          localStorage.getItem(
            `${userEmail}_calories`
          )
        ) ||

        Number(data.calories) ||

        0;

      const currentSleep =
        Number(
          localStorage.getItem(
            `${userEmail}_sleep`
          )
        ) ||

        Number(data.sleep) ||

        0;

      const currentBMI =
        Number(
          localStorage.getItem(
            `${userEmail}_bmi`
          )
        ) ||

        Number(data.bmi) ||

        0;

      const currentWorkout =
        localStorage.getItem(
          `${userEmail}_workout`
        ) ||

        data.workout ||

        "None";

      const currentDuration =
        Number(
          localStorage.getItem(
            `${userEmail}_duration`
          )
        ) ||

        Number(data.duration) ||

        0;

      const currentWater =
        Number(
          localStorage.getItem(
            `${userEmail}_waterIntake`
          )
        ) || 0;

      // UPDATE MAIN STATE
      setHealthData({

        calories:
          currentCalories,

        sleep:
          currentSleep,

        bmi:
          currentBMI,

        workout:
          currentWorkout,

        duration:
          currentDuration,

      });

      // WATER
      setWaterIntake(
        currentWater
      );

      // SLEEP GRAPH
      setSleepGraph([

        {
          day: "Mon",
          sleep:
            Math.max(
              1,
              currentSleep - 2
            ),
        },

        {
          day: "Tue",
          sleep:
            Math.max(
              1,
              currentSleep - 1
            ),
        },

        {
          day: "Today",
          sleep:
            currentSleep,
        },

      ]);

      // WORKOUT GRAPH
      setWorkoutGraph([

        {

          name:
            currentWorkout,

          duration:
            currentDuration,

        },

      ]);

    } catch (error) {

      console.log(
        "Dashboard Error:",
        error
      );

    }

  };

  // AUTO REFRESH
  useEffect(() => {

    fetchHealthData();

    const interval =
      setInterval(() => {

        fetchHealthData();

      }, 1500);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="min-h-screen bg-black text-white flex overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full"></div>

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="ml-72 p-10 w-full relative z-10">

        {/* NAVBAR */}
        <Navbar
          profileImage="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
        />

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">

            Health Analytics

          </h1>

          <p className="text-gray-400 text-xl">

            Monitor your wellness, activity and AI-driven insights in real time.

          </p>

        </div>

        {/* HEALTH CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {/* CALORIES */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-orange-500/10 border border-orange-500/20 rounded-3xl p-8"
          >

            <h2 className="text-gray-300 mb-3">

              Calories Burned

            </h2>

            <p className="text-6xl font-black text-orange-400">

              {healthData.calories}

            </p>

          </motion.div>

          {/* WATER */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8"
          >

            <h2 className="text-gray-300 mb-3">

              Water Intake

            </h2>

            <p className="text-6xl font-black text-cyan-400">

              {waterIntake}L

            </p>

          </motion.div>

          {/* SLEEP */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8"
          >

            <h2 className="text-gray-300 mb-3">

              Sleep Hours

            </h2>

            <p className="text-6xl font-black text-green-400">

              {healthData.sleep}h

            </p>

          </motion.div>

          {/* BMI */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-pink-500/10 border border-pink-500/20 rounded-3xl p-8"
          >

            <h2 className="text-gray-300 mb-3">

              BMI Score

            </h2>

            <p className="text-6xl font-black text-pink-400">

              {healthData.bmi}

            </p>

          </motion.div>

          {/* WORKOUT */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-8"
          >

            <h2 className="text-gray-300 mb-3">

              Workout Type

            </h2>

            <p className="text-4xl font-black text-purple-400 break-words">

              {healthData.workout}

            </p>

          </motion.div>

          {/* DURATION */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-8"
          >

            <h2 className="text-gray-300 mb-3">

              Workout Duration

            </h2>

            <p className="text-5xl font-black text-blue-400">

              {healthData.duration} min

            </p>

          </motion.div>

        </div>

        {/* CHART SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-12">

          {/* CALORIES GRAPH */}
          <HealthChart />

          {/* WATER PROGRESS */}
          <WaterProgress />

          {/* SLEEP GRAPH */}
          <div className="bg-white/10 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">

              Sleep Analytics 🌙

            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart data={sleepGraph}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="#22c55e"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* WORKOUT GRAPH */}
          <div className="bg-white/10 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">

              Workout Analytics 💪

            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={workoutGraph}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="duration"
                  fill="#a855f7"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  );

}