import React from 'react';
import { Link } from 'react-router-dom';


function Register(props) {
  return (
    <main className="content">
      <section className="credentials">
        <form
          onSubmit={props.onSubmit}
          className="form"
          name={props.name}
        >
          <h2 className="form__title form__title_theme_dark">{props.formTitle}</h2>

          {props.inputs}

          <button className="form__btn-save form__btn-save_theme_light" name="saveButton">
            {props.btnTitle}
          </button>

          <p className="form__suggestion">
            Уже зарегистрированы? <Link to="/sign-in" className="form__link">Войти</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
