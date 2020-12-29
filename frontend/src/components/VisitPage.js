import { Switch, Route } from "react-router-dom";
import CreatePage from "./CreatePage";

function VisitPage() {
  return (
    <Switch>
      <Route path="/page/:title" component={CreatePage} />
    </Switch>
  );
}

export default VisitPage;
