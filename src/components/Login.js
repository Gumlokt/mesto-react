import { Link } from 'react-router-dom';

function Login(props) {
  const handleChangeEmail = (e) => {
    props.onChangeEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    props.onChangePassword(e.target.value);
  };

  return (
    <main className="content">
      <section className="credentials">
        <form onSubmit={props.onSubmit} className="form" name="login">
          <h2 className="form__title form__title_theme_dark">Вход</h2>

          <input
            onChange={handleChangeEmail}
            value={props.email}
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
            value={props.password}
            type="password"
            className="form__text-input form__text-input_theme_dark"
            name="link"
            placeholder="Пароль"
            id="link"
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
