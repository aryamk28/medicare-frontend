import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Doctors from "./pages/Doctors";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Appointment from "./pages/Appointment";
import History from "./pages/History";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;