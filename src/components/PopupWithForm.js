function PopupWithForm(props) {
  return (
    <div className="popup">
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__btn-close" type="button" aria-label="Закрыть окно"></button>

        <form className="form" name={props.name}>
          <h2 className="form__title">{props.title}</h2>

          {props.children.map((input, i) => (
            <div key={i}>
              <input type="url" className="form__text-input" name={input.name} placeholder={input.placeholder} id={input.name} required />
              <span className="form__input-error" id={`${input.name}-error`}></span>
            </div>
          ))}

          <button className="form__btn-save" name="saveButton">{props.btnTitle}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
