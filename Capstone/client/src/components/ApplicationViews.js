import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import ProductList from "./ProductList";
import NewProductForm from "./NewProductForm";
import DepartmentList from "./DepartmentList";


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <ProductList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/newproduct">
          {isLoggedIn ? <NewProductForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/department">
          {isLoggedIn ? <DepartmentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};