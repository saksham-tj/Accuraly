import React from "react";
import {
  Card,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import {
  NavLink as NavBarLink,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CreateContext from "./CreateContext";   
import "./Context.css";
import ActiveContextList from "./ActiveContextList";
import { frontendRoutes } from "../../utils/constants";

// Functional component to create content screen
export default function Context() {
  return (
    <div>
      <Card className="NavBar">
        <Nav>
          <NavItem>
            <NavLink>
              <NavBarLink
                to={frontendRoutes.createContext.path}
                activeStyle={{
                  fontWeight: "bold",
                  color: "primary"
                }}
              >
                Create
              </NavBarLink>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <NavBarLink
                to={frontendRoutes.activeContext.path}
                activeStyle={{
                  fontWeight: "bold",
                  color: "primary"
                }}
              >
                Active
              </NavBarLink>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <NavBarLink
                to={frontendRoutes.pendingContext.path}
                activeStyle={{
                  fontWeight: "bold",
                  color: "primary"
                }}
              >
                Pending
              </NavBarLink>
            </NavLink>
          </NavItem>
        </Nav>
      </Card>

      <Switch>
        <Route
          path={frontendRoutes.createContext.path}
          name={frontendRoutes.createContext.name}
          render={props => <CreateContext {...props} />}
        />
        <Route
          path={frontendRoutes.activeContext.path}
          name={frontendRoutes.activeContext.name}
          render={props => <ActiveContextList {...props} text="active"/>}
        />
        <Route
          path={frontendRoutes.pendingContext.path}
          name={frontendRoutes.pendingContext.name}
          render={props => <ActiveContextList {...props} text="pending"/>}
        />
        <Redirect to={frontendRoutes.pendingContext.path} />
      </Switch>
    </div>
  );
}
