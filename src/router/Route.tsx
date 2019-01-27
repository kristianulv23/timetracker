import * as React from "react";
import { Route } from "react-router-dom";
import { IWithAuthContext, withAuthContext } from "../context/withAuthContext";
import Home from "../components/Home/Home";
import Table from "../components/Table/Table";
import Modal from "../components/Modal/Modal";
import Login from "../components/Login/Login";
import PrivateRoute from "../router/PrivateRoute";
import { RouteEnum } from "../router/RouteEnums";

interface IRoutersProps extends IWithAuthContext {}

class Routers extends React.Component<IRoutersProps, {}> {
  render() {
    const { authState } = this.props;
    return (
      <React.Fragment>
        <PrivateRoute
          exact
          path={RouteEnum.HOME}
          component={Home}
          authenticated={authState.authUser !== null}
        />
        <PrivateRoute
          exact
          path={RouteEnum.TASK}
          component={Table}
          authenticated={authState.authUser !== null}
        />
        <Route exact path={RouteEnum.CREATE} component={Modal} />
        <Route exact path={RouteEnum.LOGIN} component={Login} />
      </React.Fragment>
    );
  }
}

export default withAuthContext(Routers);