import {
  FaHome,
  FaHeartbeat,
  FaMoon,
  FaTint,
  FaFire,
  FaDumbbell,
  FaUser
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-72 h-screen bg-white/10 backdrop-blur-lg border-r border-white/20 text-white fixed p-6">

      <h1 className="text-4xl font-black mb-14 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        HealthTrack
      </h1>

      <div className="space-y-5">

        {/* Dashboard */}
        <Link
          to="/"
          className="flex items-center gap-4 w-full hover:bg-blue-500/20 p-4 rounded-2xl transition-all duration-300"
        >
          <FaHome />
          Dashboard
        </Link>

        {/* BMI */}
        <Link
          to="/bmi"
          className="flex items-center gap-4 w-full hover:bg-pink-500/20 p-4 rounded-2xl transition-all duration-300"
        >
          <FaHeartbeat />
          BMI Tracker
        </Link>

        {/* Water */}
        <Link
          to="/water"
          className="flex items-center gap-4 w-full hover:bg-cyan-500/20 p-4 rounded-2xl transition-all duration-300"
        >
          <FaTint />
          Water Intake
        </Link>

        {/* Calories */}
        <Link
          to="/calories"
          className="flex items-center gap-4 w-full hover:bg-orange-500/20 p-4 rounded-2xl transition-all duration-300"
        >
          <FaFire />
          Calories
        </Link>

        {/* Sleep */}
        <Link
          to="/sleep"
          className="flex items-center gap-4 w-full hover:bg-green-500/20 p-4 rounded-2xl transition-all duration-300"
        >
          <FaMoon />
          Sleep
        </Link>

        {/* Workout */}
        <Link
          to="/workout"
          className="flex items-center gap-4 w-full hover:bg-purple-500/20 p-4 rounded-2xl transition-all duration-300"
        >
          <FaDumbbell />
          Workouts
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="flex items-center gap-4 w-full hover:bg-yellow-500/20 p-4 rounded-2xl transition-all duration-300"
        >
          <FaUser />
          Profile
        </Link>

      </div>
    </div>
  );
}