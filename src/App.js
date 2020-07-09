import React from 'react';
import './App.css';
import Header from './components/Header/Header';

import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
 
function App() {
  
  return (
    <Router basename={process.env.PUBLIC_URL}>
    <div className="App">
      <Header loggedIn={false}/>
        <div>
          <Switch>
            <Route path="/" exact={true}>
              <Home/>
            </Route>
          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;

/*
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm'; 
import AlertComponent from './components/AlertComponent/AlertComponent'; 
const [errorMessage, updateErrorMessage] = useState(null);
<Route path="/register">
              <RegistrationForm showError={updateErrorMessage} />
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} />
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/> */