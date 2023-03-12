import { GoogleOAuthProvider } from "@react-oauth/google";
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
      <GoogleOAuthProvider clientId="326826256356-d4njh6ls9fu9863inkvim9265efjse6s.apps.googleusercontent.com">
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
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
