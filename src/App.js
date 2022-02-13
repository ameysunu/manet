import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home";
import Secret from "./pages/protected/secrets";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "./Navbar";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebaseConfig";

function App() {
  initializeApp(firebaseConfig);
  return (
    <BrowserRouter>
      <AppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/protected" component={Secret} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
