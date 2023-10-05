import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthState from "./context/auth/AuthState";
import OrderState from "./context/order/orderState";
import TableState from "./context/table/TableState";
import Footer from "./layout/Footer";
import Home from "./layout/Home";
import Navbar from "./layout/Navbar";
import StatisticState from "./context/statistic/StatisticState";
import MessengerCustomerChat from 'react-messenger-customer-chat';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="326826256356-d4njh6ls9fu9863inkvim9265efjse6s.apps.googleusercontent.com">
        <PayPalScriptProvider options={{ "client-id": "test" }}>
          <AuthState>
            <StatisticState>
              <OrderState>
                <TableState>
                  <Router>
                    <div className="App">
                      <div>
                        <Navbar />
                      </div>
                      <div className=" dark:bg-gray-900 ">
                        <ToastContainer />
                        <Home />
                        <MessengerCustomerChat
                          pageId="141660889028110"
                          appId="2088816924785631"
                        />,
                        <div className="dark:bg-gray-900">
                          <br />
                          <br />
                          <br /> <br /> <br />
                        </div>
                      </div>
                      <div className="footer">
                        <Footer />
                      </div>
                    </div>
                  </Router>
                </TableState>
              </OrderState>
            </StatisticState>
          </AuthState>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
