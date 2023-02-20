import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import NotFound from "../pages/error/NotFound";
import About from "../pages/Unauthenticated/About";
import Login from "../pages/Unauthenticated/Login";
import Register from "../pages/Unauthenticated/Register";
import Booking from "../pages/user/Booking";
import Profile from "../pages/user/Profile";
import Share from "../pages/user/Share";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;

  return (
    <>
      <Switch>
        <Route exact path="/">
          {<Share />}
        </Route>
        <Route exact path="/register">
          {isLoggedIn ? <Redirect to="/register" /> : <Register />}
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/share" /> : <Login />}
        </Route>
        <Route exact path="/cart">
          {isLoggedIn ? <Redirect to="/cart" /> : <Login />}
        </Route>
        <Route exact path="/share">
          {<Share />}
        </Route>
        <Route exact path="/booking">
          {<Booking />}
        </Route>
        <Route exact path="/about">
          {<About />}
        </Route>
        <Route exact path="/profile">
          {!isLoggedIn ? <Redirect to="/login" /> : <Profile />}
        </Route>
        <Route path="" component={NotFound} />
      </Switch>
    </>
  );
};

export default Home;
