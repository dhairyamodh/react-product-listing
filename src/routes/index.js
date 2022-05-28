import React from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Products from "../pages/products"

const Routes = () => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={Products}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default Routes;
