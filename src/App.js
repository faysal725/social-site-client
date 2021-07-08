import './App.css';
import Login from './Components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Menu from './Components/Header/Menu/Menu';
import Blog from './Components/Blog/Blog';

function App() {
  return (


    <Router>
      <Menu/>
        <Switch>
        <Route path="/blog">
            <Blog></Blog>
          </Route>
          <Route path="/home">
            <Login/>
          </Route>
          <Route exact path="/">
            <Login/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
