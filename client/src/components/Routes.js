// Routes.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./Admin"; // Assuming Admin is in the same directory
import App from "./App"; // Assuming App is in the same directory

const Routes = ({ userData }) => {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin userData={userData} />
        </Route>
        <Route path="/">
          <App userData={userData} />
        </Route>
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
};

export default Routes;
