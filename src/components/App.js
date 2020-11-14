import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }


  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }



  return (
    <div className="App">
      <Header />

      <Main
        onEditAvatar = {handleEditAvatarClick}
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onCardClick = {handleCardClick}
      />

      <Footer />


      <PopupWithForm
        title = "Обновить аватар"
        name = "avatar"
        btnTitle = "Сохранить"
        inputs = {
          <>
            <input type="url" className="form__text-input" name="avatar" defaultValue="" placeholder="Ссылка на аватарку" id="avatar" required />
            <span className="form__input-error" id="avatar-error"></span>
          </>
        }
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title = "Редактировать профиль"
        name = "profile"
        btnTitle = "Сохранить"
        inputs = {
          <>
            <input type="text" className="form__text-input" name="name" defaultValue="" placeholder="Имя деятеля" minLength="2" maxLength="40" id="name" required />
            <span className="form__input-error" id="name-error"></span>

            <input type="text" className="form__text-input" name="about" defaultValue="" placeholder="Деятельность" minLength="2" maxLength="200" id="about" required />
            <span className="form__input-error" id="about-error"></span>
          </>
        }
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title = "Новое место"
        name = "card"
        btnTitle = "Создать"
        inputs = {
          <>
            <input type="text" className="form__text-input" name="name" defaultValue="" placeholder="Название" minLength="1" maxLength="30" id="name" required />
            <span className="form__input-error" id="name-error"></span>

            <input type="url" className="form__text-input" name="link" defaultValue="" placeholder="Ссылка на картинку" id="link" required />
            <span className="form__input-error" id="link-error"></span>
          </>
        }
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title = "Вы уверены?"
        name = "confirmation"
        btnTitle = "Да"
        isOpen={false}
        onClose={closeAllPopups}
      />

      <ImagePopup
        card = {selectedCard}
        isOpen = {isImagePopupOpen}
        onClose = {closeAllPopups}
      />
    </div>
  );
}

export default App;
