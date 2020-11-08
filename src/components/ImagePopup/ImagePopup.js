function ImagePopup() {
  return (
    <>
      <div className="popup">
        <div className="popup__container popup__container_theme_dark">
          <button className="popup__btn-close" type="button" aria-label="Закрыть окно"></button>

          <figure className="popup__image-container">
            <img src="https://via.placeholder.com/282" alt="Фото красивого места на весь экран" className="popup__image" />

            <figcaption className="popup__image-title">Название красивого места</figcaption>
          </figure>

        </div>
      </div>
    </>
  );
}

export default ImagePopup;
