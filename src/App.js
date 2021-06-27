import React , {useState} from 'react';
import Home from './Home';
import './App.scss';
import Login from './Login';
import { Switch, Route, Link, Redirect } from "react-router-dom";

const App = () => {

    var session = JSON.parse(localStorage.getItem('session'));

    if (session === null) {
        session = '';
    }
    
    const [LoginStatus, setLoginStatus] = useState(true);

    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
                <Login {...props} LoginStatus={LoginStatus}/>
            )}
          />
          <Route
            exact
            path="/home"
            render={(props) => <Home {...props} LoginStatus={LoginStatus} />}
          />
          <Redirect to="/" />
        </Switch>
      </>
    );
}

export default App;
