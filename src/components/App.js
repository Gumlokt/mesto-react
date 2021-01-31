import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Dashboard from './Dashboard';

import Login from './Login';
import Register from './Register';
// import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [headerUrl, setHeaderUrl] = useState({
  //   link: '/sign-up',
  //   text: 'Регистрация',
  // });

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in">
          <Header navLink="/sign-up" navTitle="Регистрация" />
          <Login />
        </Route>

        <Route path="/sign-up">
          <Header navLink="/sign-in" navTitle="Войти" />

          <Register />
        </Route>

        <ProtectedRoute path="/" loggedIn={loggedIn} component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
