import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateForm from "./CreateForm";

function AddForm() {
  return (
    <Switch>
      <Route path="/createform/:title" component={CreateForm} />
    </Switch>
  );
}

export default AddForm;
