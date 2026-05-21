import { useEffect, useState } from "react";
import API from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function HealthChart() {

  const [chartData, setChartData] = useState([]);

  // FETCH CHART DATA
  const fetchChartData = async () => {

    try {

      // GET LOGGED IN USER
      const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")
      );

      const userEmail = loggedInUser?.email;

      // VALIDATION
      if (!userEmail) {

        console.log("No user email found");

        return;

      }

      console.log("FETCHING DATA FOR:", userEmail);

      // FETCH USER DATA
      const res = await API.get(
        `/health/all/${userEmail}`
      );

      console.log("BACKEND DATA:", res.data);

      // FORMAT DATA
      const formattedData = res.data.map(
        (item, index) => ({

          name: `Entry ${index + 1}`,

          calories: Number(item.calories) || 0,

        })
      );

      console.log("FORMATTED:", formattedData);

      setChartData(formattedData);

    } catch (error) {

      console.log(
        "Chart Error:",
        error.response?.data || error.message
      );

    }

  };

  // LOAD ON PAGE OPEN
  useEffect(() => {

    fetchChartData();

    // AUTO REFRESH
    const interval = setInterval(() => {

      fetchChartData();

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl mb-10">

      <h2 className="text-3xl font-bold mb-8 text-white">

        Calories Analytics 📈

      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#444"
          />

          <XAxis
            dataKey="name"
            stroke="#ccc"
          />

          <YAxis
            stroke="#ccc"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="calories"
            stroke="#06b6d4"
            strokeWidth={4}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}