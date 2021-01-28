function Login(props) {
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
        </form>
      </section>
    </main>
  );
}

export default Login;
