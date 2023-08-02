import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [idPelanggan, setIdPelanggan] = useState(null);
  const [idLevel, setIdLevel] = useState(null);

  return (
    <AppProvider user={user}>
      <Router>
        <Routes>
          <Route path="/" />
          <Route path="/home" />
          <Route path="/login" />
          <Route path="/register" />
          <Route path="/dashboard" />
          <Route path="/pelanggan" />
          <Route path="/penggunaan" />
          <Route path="/tagihan" />
          <Route path="/pembayaran" />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
