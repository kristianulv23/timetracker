import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteEnum } from "../router/RouteEnums";

export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={RouteEnum.LOGIN} />
        )
      }
    />
  );
}
