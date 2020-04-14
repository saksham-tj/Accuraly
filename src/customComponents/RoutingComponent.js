import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { frontendRoutes } from "../utils/constants";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const DefaultLayout = React.lazy(() => import("../containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("../views/Pages/Login/Login"));
const ForgotPassword = React.lazy(() => import("../views/Pages/ForgotPassword/ForgotPassword"));
const Register = React.lazy(() => import("../views/Pages/Register"));

export default function RoutingComponent() {
  const userState = useSelector(state => state.userDetailsReducer);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={frontendRoutes.home.path}
          name={frontendRoutes.home.name}
          render={props => {
            return (
              <DefaultLayout {...props} />
            )
          }}
        />
      </Switch>
      {/* <React.Suspense fallback={loading()}>
        {localStorage.getItem("token") || userState.isLoggedIn ? (
          <Switch>
            <Route
              path={frontendRoutes.home.path}
              name={frontendRoutes.home.name}
              render={props => {
                return(
                  <DefaultLayout {...props} />
                )
              }}
            />
          </Switch>
        ) : (
          <Switch>
            {console.log("inside login routes")}
            <Route
              exact
              path={frontendRoutes.login.path}
              name={frontendRoutes.login.name}
              render={props => <Login {...props} />}
            />
            <Route
              exact
              path={frontendRoutes.register.path}
              name={frontendRoutes.register.name}
              render={props => <Register {...props} />}
            />
            <Route
              path={frontendRoutes.forgotPassword.path}
              name={frontendRoutes.forgotPassword.name}
              render={props => <ForgotPassword {...props} />}
            />
            <Redirect to={frontendRoutes.login.path} />
          </Switch>
        )}
      </React.Suspense> */}
    </BrowserRouter>
  );
}
