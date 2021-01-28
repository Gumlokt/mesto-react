import iconSuccess from '../images/icons/icon-success.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup${props.isOpen ? ' popup_opened' : ' popup_opened'}`}>
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__btn-close" type="button" aria-label="Закрыть окно"></button>

        <img src={iconSuccess} alt="Success icon" className="popup__icon" />

        <p className="popup__message">Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
