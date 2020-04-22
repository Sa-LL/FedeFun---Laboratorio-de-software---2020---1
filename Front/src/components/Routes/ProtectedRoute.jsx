import React from "react";
import { Route } from "react-router-dom";
import Redirect from "./Redirect";

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (sessionStorage.getItem("auth") === "true") {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect />;
        }
      }}
    />
  );
}
