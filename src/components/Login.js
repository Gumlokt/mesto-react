import { useState } from 'react';

function Login(props) {
  const [credentials, setCredentials] = useState({ email: '', password: ''});

  function handleChange (e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    // props.onAddCard({
    //   name: email,
    //   link: password
    // });
    console.log(credentials);
    setCredentials({ email: '', password: ''});
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
