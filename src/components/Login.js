import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../auth.js';

function Login(props) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    // props.onAddCard({
    //   name: email,
    //   link: password
    // });
    auth.authorize(credentials).then((data) => {
      if (!data) {
        console.log({ message: 'Что-то пошло не так!' });
        return;
      }

      if (data.error) {
        console.log(data.error);
        return;
      } else if (data.token) {
        setCredentials({ email: '', password: '' });
        props.onLogin(true);
        history.push('/');
      } else {
        console.log({ message: 'Барабашка взял и не прислал token :-)' });
      }
    });
  }

  return (
    <main className="content">
      <section className="credentials">
        <form onSubmit={handleSubmit} className="form" name="login">
          <h2 className="form__title form__title_theme_dark">Вход</h2>

          <input
            onChange={handleChange}
            value={credentials.email}
            type="email"
            className="form__text-input form__text-input_theme_dark"
            name="email"
            placeholder="Email"
            id="email"
            required
          />
          <span className="form__input-error" id="email-error"></span>

          <input
            onChange={handleChange}
            value={credentials.password}
            type="password"
            className="form__text-input form__text-input_theme_dark"
            name="password"
            placeholder="Пароль"
            id="password"
            required
          />
          <span className="form__input-error" id="password-error"></span>

          <button
            className="form__btn-save form__btn-save_theme_light"
            name="saveButton"
          >
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
