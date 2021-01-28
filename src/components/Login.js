function Login(props) {
  return (
    <main className="content">
      <section className="credentials">
        <form
          onSubmit={props.onSubmit}
          className="credentials__form"
          name={props.name}
        >
          <h2 className="form__title">{props.formTitle}</h2>

          {props.inputs}

          <button className="form__btn-save" name="saveButton">
            {props.btnTitle}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
