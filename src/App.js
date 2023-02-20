import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AuthState from "./context/auth/AuthState";
import Footer from "./layout/Footer";
import Home from "./layout/Home";
import Navbar from "./layout/Navbar";
function App() {
  return (
    <>
      <AuthState>
        <Router>
          <div className="App">
            <div>
              <Navbar />
            </div>
            <div className="dark:bg-gray-900">
              <Home />
            </div>
            <div className=" dark:bg-gray-800">
              <Footer />
            </div>
          </div>
        </Router>
      </AuthState>
    </>
  );
}

export default App;
