import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import ProductList from "./ProductList";
import NewProductForm from "./NewProductForm";
import DepartmentList from "./DepartmentList";
import ProductDetails from "./ProductDetails";
import MyProductList from "./MyProductList";
import NewsFeedProductDetails from "./NewsFeedProductDetails";
import ProductByDepartment from "./ProductByDepartment";
import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";
import RatingList from "./RatingList";
import NewRatingForm from "./NewRatingForm";


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

        <Route path={`/products/:id`}>
          {isLoggedIn ? <ProductDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path={`/NewsFeedproducts/:id`}>
          {isLoggedIn ? <NewsFeedProductDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/product/getbyuser" exact>
          {isLoggedIn ? <MyProductList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/productbydepartment" exact>
          {isLoggedIn ? <ProductByDepartment /> : <Redirect to="/login" />}
        </Route>

        <Route path={`/comments/:id`}>
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/newcomment/:id">
          {isLoggedIn ? <NewCommentForm /> : <Redirect to="/login" />}
        </Route>

        <Route path={`/ratings/:id`}>
          {isLoggedIn ? <RatingList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/newrating/:id">
          {isLoggedIn ? <NewRatingForm /> : <Redirect to="/login" />}
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