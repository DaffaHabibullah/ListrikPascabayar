import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/home/dashboard/dashboard";
import User from "./pages/home/user/User";

const App = () => {
  const [user, setUser] = useState(null);
  const [idPelanggan, setIdPelanggan] = useState(null);
  const [idLevel, setIdLevel] = useState(null);

  return (
    <>
      <AppProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
