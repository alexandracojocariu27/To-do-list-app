 
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
 
  
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
       

    </div>
  );
}

export default App;
