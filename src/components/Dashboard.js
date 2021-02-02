import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import { appApi } from '../utils/Api';

function Dashboard(props) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  // const [props.currentUser, props.handleUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      //в Promise.all передаем массив промисов которые нужно выполнить
      appApi.getUserInfo(),
      appApi.getInitialCards(),
    ])
      .then((values) => {
        //попадаем сюда когда массив промисов будут выполнены
        const [userData, initialCards] = values;

        props.handleUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        //попадаем сюда если хотя бы один из промисов завершится ошибкой
        console.log(err.message);
      });
  }, []);

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

  function handleUpdateAvatar(newAvatar) {
    appApi.setAvatar(newAvatar).then((updatedAvatar) => {
      props.handleUser(updatedAvatar);
      closeAllPopups();
    });
  }

  function handleUpdateUser(newUserData) {
    appApi.setUserInfo(newUserData).then((updatedUserData) => {
      props.handleUser(updatedUserData);
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmi(newCardData) {
    appApi.addCard(newCardData).then((addedCard) => {
      setCards([addedCard, ...cards]);
      closeAllPopups();
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === props.currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    appApi.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    appApi.deleteCard(card._id).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.filter((c) => c._id !== card._id);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        userEmail={props.userEmail}
        onLogout={props.onLogout}
      />

      <Main
        // user={props.currentUser}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddPlaceSubmi}
      />

      <PopupWithForm
        title="Вы уверены?"
        name="confirmation"
        btnTitle="Да"
        isOpen={false}
        onClose={closeAllPopups}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default Dashboard;
