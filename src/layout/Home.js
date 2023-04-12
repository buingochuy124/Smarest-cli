import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import About from "../pages/Unauthenticated/About";
import Login from "../pages/Unauthenticated/Login";
import Main from "../pages/Unauthenticated/Main";
import Register from "../pages/Unauthenticated/Register";
import Table from "../pages/Unauthenticated/Table";
import NotFound from "../pages/error/NotFound";
import Booking from "../pages/user/Booking";
import Cart from "../pages/user/Cart";
import CheckOut from "../pages/user/CheckOut";
import OrderDetails from "../pages/user/OrderDetails";
import Profile from "../pages/user/Profile";
import TableManager from "../pages/user/TableManager";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { table, isLoggedIn, role } = authContext;
  const isManager = role.includes("Manager");
  //const isGuest = role.includes("Guest");

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

        <Route exact path="/orderdetails/:orderId">
          {isLoggedIn ? <OrderDetails /> : <Login />}
        </Route>
        <Route exact path="/about">
          {<About />}
        </Route>
        <Route exact path="/tablemanager">
          {isManager ? <TableManager /> : <Main />}
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
