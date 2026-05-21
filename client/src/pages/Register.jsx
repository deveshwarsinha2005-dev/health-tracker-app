import { useState } from "react";

import API from "../services/api";

export default function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  // REGISTER USER
  const handleRegister = async () => {

    // VALIDATION
    if (
      !name ||
      !email ||
      !password
    ) {

      setMessage(
        "Please fill all fields"
      );

      return;

    }

    try {

      // API CALL
      const response =
        await API.post(

          "/auth/signup",

          {
            name,
            email,
            password,
          }

        );

      // SAVE TOKEN
      localStorage.setItem(

        "token",

        response.data.token

      );

      // SAVE USER
      localStorage.setItem(

        "loggedInUser",

        JSON.stringify(
          response.data.user
        )

      );

      setMessage(
        "Registration Successful 🎉"
      );

      // REDIRECT
      setTimeout(() => {

        window.location.href =
          "/dashboard";

      }, 1500);

    } catch (error) {

      console.log(error);

      setMessage(

        error.response?.data
          ?.message ||

        "Registration Failed"

      );

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-10 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-12 shadow-2xl">

        {/* HEADER */}
        <div className="mb-12 text-center">

          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">

            Create Account

          </h1>

          <p className="text-gray-400 text-xl">

            Register to access your personalized health analytics dashboard.

          </p>

        </div>

        {/* NAME */}
        <div className="mb-8">

          <label className="block text-gray-400 mb-3 text-lg">

            Full Name

          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter your full name"
            className="w-full bg-[#111111] border border-white/10 rounded-2xl p-5 text-xl text-white outline-none focus:border-cyan-500 transition-all duration-300"
          />

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
              setEmail(e.target.value)
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
              setPassword(e.target.value)
            }
            placeholder="Create a password"
            className="w-full bg-[#111111] border border-white/10 rounded-2xl p-5 text-xl text-white outline-none focus:border-purple-500 transition-all duration-300"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 transition-all duration-300 py-5 rounded-2xl text-2xl font-bold text-white shadow-2xl"
        >

          Register Account

        </button>

        {/* MESSAGE */}
        {message && (

          <div className="mt-8 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">

            <p className="text-cyan-300 text-lg font-semibold text-center">

              {message}

            </p>

          </div>

        )}

        {/* LOGIN LINK */}
        <div className="mt-10 text-center">

          <p className="text-gray-400 text-lg">

            Already have an account?

            <span
              onClick={() =>
                (window.location.href =
                  "/login")
              }
              className="text-cyan-400 ml-2 cursor-pointer hover:underline"
            >

              Login

            </span>

          </p>

        </div>

      </div>

    </div>

  );

}