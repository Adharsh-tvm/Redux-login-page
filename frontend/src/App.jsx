import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    username: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "https://via.placeholder.com/150", // Replace with actual image
});

  return (
      <Routes> 
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
  );
}

export default App;
