import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import PopupWithForm from './components/PopupWithForm/PopupWithForm';
import ImagePopup from './components/ImagePopup/ImagePopup';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);

    const popupSelector = document.querySelector('.form[name="avatar"]');
    const popupWindow = popupSelector.closest('.popup');
    popupWindow.classList.add('popup_opened');
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);

    const popupSelector = document.querySelector('.form[name="profile"]');
    const popupWindow = popupSelector.closest('.popup');
    popupWindow.classList.add('popup_opened');
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);

    const popupSelector = document.querySelector('.form[name="card"]');
    const popupWindow = popupSelector.closest('.popup');
    popupWindow.classList.add('popup_opened');
  }


  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);

    const popupWindow = document.querySelector('.popup_opened');
    popupWindow.classList.remove('popup_opened');
  }



  return (
    <div className="App">
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />

      <Footer />


      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        btnTitle="Сохранить"
        inputs={[
          {name: 'avatar', placeholder: 'Ссылка на аватарку'}
        ]}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        btnTitle="Сохранить"
        inputs={[
          {name: 'name', placeholder: 'Имя деятеля'},
          {name: 'about', placeholder: 'Деятельность'}
        ]}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title="Новое место"
        name="card"
        btnTitle="Создать"
        inputs={[
          {name: 'name', placeholder: 'Название'},
          {name: 'link', placeholder: 'Ссылка на картинку'}
        ]}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title="Вы уверены?"
        name="confirmation"
        btnTitle="Да"
        inputs={[]}
        isOpen={false}
        onClose={closeAllPopups}
      />

      <ImagePopup />





      <template id="element">
        <ul className="element">
          <li className="element__item">
            <img src="https://via.placeholder.com/282" alt="Фото красивого места" className="element__image" />

            <button className="element__btn-remove" type="button" aria-label="Удалить карточку"></button>
          </li>

          <li className="element__item">
            <div className="element__body">
              <h2 className="element__title">Эльбрус</h2>

              <div className="element__like-zone">
                <button className="element__btn-like" type="button" aria-label="Поставить либо убрать лайк"></button>
                <p className="element__likes">5</p>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </div>
  );
}

export default App;
