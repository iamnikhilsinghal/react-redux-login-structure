import React from "react";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
import { getAuthToken } from "../../services/authService";
import history from "../../history";
import QuickConnectList from "../QuickConnect/QuickConnectList";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Login = React.lazy(() => import("../auth/login"));
const Dashboard = React.lazy(() => import("../home/dashboard/dashboard"));

function Routes() {
  return (
    <HashRouter history={history}>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/dashboard"
            name="Dashboard Page"
            render={(props) =>
              getAuthToken() ? (
                <Dashboard {...props} />
              ) : (
                <Redirect to="login" />
              )
            }
          />
          <Route
            exact
            path="/"
            name="Home"
            render={(props) =>
              getAuthToken() ? (
                <Redirect to="dashboard" />
              ) : (
                <Redirect to="login" />
              )
            }
          />
          <Route
            exact
            path="/quickConnectList"
            name="QuickConnectList"
            render={(props) => <QuickConnectList {...props} />}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default Routes;
