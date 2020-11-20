import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import { appApi } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  // const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([ //в Promise.all передаем массив промисов которые нужно выполнить
      appApi.getUserInfo(),
    ])
    .then((values) => { //попадаем сюда когда массив промисов будут выполнены
      const [ userData ] = values;
      setCurrentUser(userData);
    })
    .catch((err) => { //попадаем сюда если хотя бы один из промисов завершится ошибкой
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
      setCurrentUser(updatedAvatar);
      closeAllPopups();
    });
  }

  function handleUpdateUser(newUserData) {
    appApi.setUserInfo(newUserData).then((updatedUserData) => {
      setCurrentUser(updatedUserData);
      closeAllPopups();
    });
  }



  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditAvatar = {handleEditAvatarClick}
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onCardClick = {handleCardClick}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
