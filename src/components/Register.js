import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../auth.js';

function Register() {
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

    auth.register(credentials).then((data) => {
      if (!data) {
        console.log({ message: 'Что-то пошло не так!' });
        return;
      }

      if (data.error) {
        console.log(data.error);
        return;
      } else {
        // console.log({ message: 'регистрация успешна' });
        history.push('/sing-in');
        return;
      }
    });
  }

  return (
    <main className="content">
      <section className="credentials">
        <form onSubmit={handleSubmit} className="form" name="registration">
          <h2 className="form__title form__title_theme_dark">Регистрация</h2>

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
            Зарегистрироваться
          </button>

          <p className="form__suggestion">
            Уже зарегистрированы?{' '}
            <Link to="/sign-in" className="form__link">
              Войти
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
