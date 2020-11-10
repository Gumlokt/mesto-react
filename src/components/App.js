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
  const [selectedCard, setSelectedCard] = React.useState({});


  function openWindow(selector) {
    const popupSelector = document.querySelector(selector);
    const popupWindow = popupSelector.closest('.popup');
    popupWindow.classList.add('popup_opened');
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    openWindow('.form[name="avatar"]');
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    openWindow('.form[name="profile"]');
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    openWindow('.form[name="card"]');
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    openWindow('.popup__image-container');
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
        onCardClick={handleCardClick}
      />

      <Footer />


      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        btnTitle="Сохранить"
        children={[
          {name: 'avatar', placeholder: 'Ссылка на аватарку'}
        ]}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        btnTitle="Сохранить"
        children={[
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
        children={[
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
        children={[]}
        isOpen={false}
        onClose={closeAllPopups}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
