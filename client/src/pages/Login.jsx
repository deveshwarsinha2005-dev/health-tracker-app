import { useState } from "react";

import API from "../services/api";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  // LOGIN
  const handleLogin = async () => {

    try {

      // SEND TO BACKEND
      const res =
        await API.post(

          "/auth/login",

          {
            email,
            password,
          }

        );

      console.log(
        "LOGIN RESPONSE:",
        res.data
      );

      // SAVE TOKEN
      localStorage.setItem(

        "token",

        res.data.token

      );

      // SAVE USER
      localStorage.setItem(

        "loggedInUser",

        JSON.stringify(
          res.data.user
        )

      );

      // SAVE EMAIL
      localStorage.setItem(

        "userEmail",

        res.data.user.email

      );

      setMessage(
        "Login Successful 😄🔥"
      );

      // REDIRECT
      setTimeout(() => {

        window.location.href =
          "/dashboard";

      }, 1200);

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );

      setMessage(
        "Invalid email or password ❌"
      );

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-10 relative overflow-hidden">

      {/* BG */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-12 shadow-2xl">

        {/* HEADER */}
        <div className="mb-12 text-center">

          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">

            Welcome Back

          </h1>

          <p className="text-gray-400 text-xl">

            Login to access your health analytics dashboard.

          </p>

        </div>

        {/* EMAIL */}
        <div className="mb-8">

          <label className="block text-gray-400 mb-3 text-lg">

            Email Address

          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Enter your email"
            className="w-full bg-[#111111] border border-white/10 rounded-2xl p-5 text-xl text-white outline-none focus:border-cyan-500 transition-all duration-300"
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-10">

          <label className="block text-gray-400 mb-3 text-lg">

            Password

          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Enter your password"
            className="w-full bg-[#111111] border border-white/10 rounded-2xl p-5 text-xl text-white outline-none focus:border-purple-500 transition-all duration-300"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 transition-all duration-300 py-5 rounded-2xl text-2xl font-bold text-white shadow-2xl"
        >

          Login

        </button>

        {/* MESSAGE */}
        {message && (

          <div className="mt-8 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">

            <p className="text-cyan-300 text-lg font-semibold text-center">

              {message}

            </p>

          </div>

        )}

        {/* REGISTER */}
        <div className="mt-10 text-center">

          <p className="text-gray-400 text-lg">

            New user?

            <span
              onClick={() =>
                (
                  window.location.href =
                    "/register"
                )
              }
              className="text-cyan-400 ml-2 cursor-pointer hover:underline"
            >

              Create Account

            </span>

          </p>

        </div>

      </div>

    </div>

  );

}