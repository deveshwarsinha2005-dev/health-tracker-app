import { motion } from "framer-motion";

export default function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-lg rounded-3xl p-8 mt-10 shadow-2xl"
    >

      <h2 className="text-3xl font-bold mb-6 text-white">
        AI Health Insights 🤖
      </h2>

      <div className="space-y-5">

        <div className="bg-white/10 p-5 rounded-2xl">
          <p className="text-lg text-gray-200">
            💧 Your water intake is lower than optimal today. Try drinking 1.5L more water.
          </p>
        </div>

        <div className="bg-white/10 p-5 rounded-2xl">
          <p className="text-lg text-gray-200">
            😴 Your sleep consistency improved by 18% this week.
          </p>
        </div>

        <div className="bg-white/10 p-5 rounded-2xl">
          <p className="text-lg text-gray-200">
            🏃 Based on your calorie intake, a 20-minute workout is recommended today.
          </p>
        </div>

      </div>

    </motion.div>
  );
}