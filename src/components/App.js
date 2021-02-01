import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../auth.js';

import Header from './Header';
import Dashboard from './Dashboard';

import Login from './Login';
import Register from './Register';
// import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = React.useState({});

  function handleUser(user) {
    setCurrentUser(user);
  }

  function handleLogin(trueOrFalse) {
    setLoggedIn(trueOrFalse);
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      if (token) {
        auth.getContent(token).then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            handleLogin(true);
            history.push('/');
          }
        });
      }
    }

    // // Возвращаем функцию, которая удаляет эффекты
    // return () => {
    //   setUserEmail('');
    // };
  });

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in">
          <Header navLink="/sign-up" navTitle="Регистрация" />
          <Login onLogin={handleLogin} />
        </Route>

        <Route path="/sign-up">
          <Header navLink="/sign-in" navTitle="Войти" />
          <Register />
        </Route>

        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRoute
            path="/"
            currentUser={currentUser}
            handleUser={handleUser}
            loggedIn={loggedIn}
            userEmail={userEmail}
            onLogout={handleLogin}
            component={Dashboard}
          />
        </CurrentUserContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
