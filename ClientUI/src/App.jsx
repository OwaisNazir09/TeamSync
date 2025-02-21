import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserAuth from "./pages/UserAuth/UserAuth";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserAuth/*" element={<UserAuth />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
