import * as React from "react";
import { Router } from "@reach/router";
import Login from "./Login";
import Home from "./Home";

// Ideally, if auth was needed, I would use React.Context<AuthContext> here to hold token or handle cookie logic
function App() {
  return (
    <Router>
      <Login default path="/" />
      <Home path="/home/:address" />
    </Router>
  );
}

export default App;
