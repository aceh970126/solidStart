import { Router, Route } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";

const Routes = () => {
  return (
    <Router root={MainLayout}>
      <Route path="/" component={HomePage} />
    </Router>
  );
};

export default Routes;
