function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <ul className="element">
      <li className="element__item">
        <img onClick={handleClick} src={props.card.link} alt="Фото красивого места" className="element__image" />

        <button className="element__btn-remove" type="button" aria-label="Удалить карточку"></button>
      </li>

      <li className="element__item">
        <div className="element__body">
          <h2 className="element__title">{props.card.name}</h2>

          <div className="element__like-zone">
            <button className="element__btn-like" type="button" aria-label="Поставить либо убрать лайк"></button>
            <p className="element__likes">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default Card;
