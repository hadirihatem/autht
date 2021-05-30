import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import PrivetRoute from "./PrivetRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Feed from "./pages/Feed"
import Login from "./pages/Login"


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivetRoute exact path="/feed" component={Feed} />
        </switch>
      </Router>
    </div>
  );
}

export default App



