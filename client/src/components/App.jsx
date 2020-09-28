import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Table from "./Table";
import RidePreview from "./RidePreview";
import history from "../history";

const App = () => {
  return (
    <div className="ui container" style={{ paddingTop: 30, paddingBottom: 30 }}>
      <Router history={history}>
        <div>
          <Table />
          <Switch>
            <Route path="/rides/:id" exact component={RidePreview} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
