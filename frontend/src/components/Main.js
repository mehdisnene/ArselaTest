import React from "react";
import { Switch, Route } from "react-router-dom";
import AddForm from "./AddForm";

import Home from "./Home";
import VisitPage from "./VisitPage";

function Main() {
  return (
    <main>
      <Switch>
        <Route path="/createform" component={AddForm} />
        <Route path="/page" component={VisitPage} />
        <Route exact path="" component={Home} />
      </Switch>
    </main>
  );
}

export default Main;
