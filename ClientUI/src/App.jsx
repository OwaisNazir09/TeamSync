import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserAuth from "./pages/UserAuth/UserAuth";

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserAuth/*" element={<UserAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
