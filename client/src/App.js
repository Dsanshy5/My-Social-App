import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'; 
import './index.css'; 
import Navbar from "./components/navbar";
import Homescreen from "./screens/homescreen";
import Loginscreen from "./screens/loginscreen";
import Registerscreen from "./screens/registerscreen";
import EventRegistrationScreen from "./screens/EventRegistrationScreen";
import MyBookingsScreen from "./screens/MyBookingsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import AdminPanel from "./screens/AdminPanel";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("currentUser")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="app-container">
      {/* --- MOON AND SHOOTING STAR DIVS HAVE BEEN REMOVED --- */}
      <div className="stars">
        <div id="stars1"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Homescreen />} />
          <Route path="/login" element={<Loginscreen setUser={setUser} />} />
          <Route path="/register" element={<Registerscreen setUser={setUser} />} />
          <Route
            path="/register-event/:eventId"
            element={user ? <EventRegistrationScreen /> : <Navigate to="/login" />}
          />
          <Route
            path="/mybookings"
            element={user ? <MyBookingsScreen /> : <Navigate to="/login" />}
          />
           <Route
            path="/payment/:bookingId"
            element={user ? <PaymentScreen /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={user?.isAdmin ? <AdminPanel /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
