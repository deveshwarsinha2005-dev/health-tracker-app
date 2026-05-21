import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Water from "./pages/Water";
import BMI from "./pages/BMI";
import Calories from "./pages/Calories";
import Sleep from "./pages/Sleep";
import Workout from "./pages/Workout";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/water" element={<Water />} />

        <Route path="/bmi" element={<BMI />} />

        <Route path="/calories" element={<Calories />} />

        <Route path="/sleep" element={<Sleep />} />

        <Route path="/workout" element={<Workout />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/register" element={<Register />} />


      </Routes>

    </BrowserRouter>

  );

}

export default App;