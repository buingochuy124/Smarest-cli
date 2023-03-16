import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import NotFound from "../pages/error/NotFound";
import About from "../pages/Unauthenticated/About";
import Login from "../pages/Unauthenticated/Login";
import Main from "../pages/Unauthenticated/Main";
import Register from "../pages/Unauthenticated/Register";
import Table from "../pages/Unauthenticated/Table";
import Booking from "../pages/user/Booking";
import Cart from "../pages/user/Cart";
import CheckOut from "../pages/user/CheckOut";
import Profile from "../pages/user/Profile";
import TableManager from "../pages/user/TableManager";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { table, isLoggedIn } = authContext;

  return (
    <>
      <Switch>
        <Route exact path="/">
          {<Main />}
        </Route>
        <Route exact path="/register">
          {isLoggedIn ? <Redirect to="/register" /> : <Register />}
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/table" /> : <Login />}
        </Route>
        <Route exact path="/cart">
          {isLoggedIn ? <Cart /> : <Login />}
        </Route>
        <Route exact path="/share">
          {<Main />}
        </Route>
        <Route exact path="/booking">
          {<Booking />}
        </Route>
        <Route exact path="/checkout">
          {isLoggedIn ? <CheckOut /> : <Login />}
        </Route>
        <Route exact path="/about">
          {<About />}
        </Route>
        <Route exact path="/tablemanager">
          {<TableManager />}
        </Route>
        <Route exact path="/table">
          {table ? <Redirect to="/share" /> : <Table />}
        </Route>
        <Route exact path="/table/:tableId">
          {table ? <Redirect to="/share" /> : <Table />}
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
