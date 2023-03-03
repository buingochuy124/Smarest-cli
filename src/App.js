import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AuthState from "./context/auth/AuthState";
import TableState from "./context/table/TableState";
import Footer from "./layout/Footer";
import Home from "./layout/Home";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <>
      <AuthState>
        <TableState>
          <Router>
            <div className="App">
              <div>
                <Navbar />
              </div>
              <div className=" dark:bg-gray-900 ">
                <Home />
                <div className="dark:bg-gray-900">
                  <br />
                  <br /> <br /> <br /> <br />
                </div>
              </div>

              <div className="footer">
                <Footer />
              </div>
            </div>
          </Router>
        </TableState>
      </AuthState>
    </>
  );
}

export default App;
