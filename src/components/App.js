import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Dashboard from './Dashboard';

import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [headerUrl, setHeaderUrl] = React.useState({
    link: '/sign-up',
    text: 'Регистрация',
  });

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    // props.onAddCard({
    //   name: email,
    //   link: password
    // });
    console.log({ name: email, link: password });
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in">
          <Header navLink="/sign-up" navTitle="Регистрация" />

          <Login
            formTitle="Вход"
            name="registration"
            btnTitle="Войти"
            inputs={
              <>
                <input
                  onChange={handleChangeEmail}
                  defaultValue={email}
                  type="email"
                  className="form__text-input"
                  name="email"
                  placeholder="E-Mail"
                  id="email"
                  required
                />
                <span className="form__input-error" id="name-error"></span>

                <input
                  onChange={handlePassword}
                  defaultValue={password}
                  type="password"
                  className="form__text-input"
                  name="link"
                  placeholder="Пароль"
                  id="link"
                  required
                />
                <span className="form__input-error" id="link-error"></span>
              </>
            }
            onSubmit={handleSubmit}
          />
        </Route>

        <Route path="/sign-up">
          <Header navLink="/sign-in" navTitle="Войти" />

          <Register />
        </Route>

        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Dashboard}
        />
      </Switch>
    </div>
  );
}

export default App;
