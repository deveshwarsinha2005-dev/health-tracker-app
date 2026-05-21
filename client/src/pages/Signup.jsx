import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/signup",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Signup Successful 😄");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Signup Failed");

    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-black to-purple-900 flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >

        <h1 className="text-5xl font-black mb-10 text-center bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-5 rounded-2xl bg-black/30 mb-5 text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-5 rounded-2xl bg-black/30 mb-5 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-5 rounded-2xl bg-black/30 mb-5 text-white"
        />

        <button
          className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 p-5 rounded-2xl font-bold text-white"
        >
          Create Account
        </button>

      </form>

    </div>
  );
}