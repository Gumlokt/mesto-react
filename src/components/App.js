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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
  };

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    // props.onAddCard({
    //   name: email,
    //   link: password
    // });
    console.log({ email: email, password: password });
    setEmail('');
    setPassword('');
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in">
          <Header navLink="/sign-up" navTitle="Регистрация" />

          <Login
            email={email}
            password={password}
            onChangeEmail={handleChangeEmail}
            onChangePassword={handleChangePassword}
            onSubmit={handleSubmit}
          />
        </Route>

        <Route path="/sign-up">
          <Header navLink="/sign-in" navTitle="Войти" />

          <Register
            onChange={handleChangeEmail}
            email={email}
            onSubmit={handleSubmit}
            formTitle="Регистрация"
            name="registration"
            btnTitle="Зарегистрироваться"
            inputs={
              <>
                <input
                  onChange={handleChangeEmail}
                  value={email}
                  type="email"
                  className="form__text-input form__text-input_theme_dark"
                  name="email"
                  placeholder="Email"
                  id="email"
                  required
                />
                <span className="form__input-error" id="email-error"></span>

                <input
                  onChange={handleChangePassword}
                  type="password"
                  className="form__text-input form__text-input_theme_dark"
                  name="link"
                  placeholder="Пароль"
                  id="link"
                  required
                />
                <span className="form__input-error" id="password-error"></span>
              </>
            }
            onSubmit={handleSubmit}
          />
        </Route>

        <ProtectedRoute path="/" loggedIn={loggedIn} component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
