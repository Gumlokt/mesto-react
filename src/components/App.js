import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../auth.js';

import Header from './Header';
import Dashboard from './Dashboard';

import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isInformerPopupOpen, setInformerPopupOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [messageToUser, setMessageToUser] = useState('');
  const [popupIconSuccess, setPopupIconSuccess] = useState(false);

  function handleCredentialsChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  function handleUser(user) {
    setCurrentUser(user);
  }

  function handleLoggedIn(trueOrFalse) {
    setLoggedIn(trueOrFalse);
  }

  function openInformerPopup(message, successIcon = false) {
    setMessageToUser(message);
    setInformerPopupOpen(true);
    setPopupIconSuccess(successIcon);
  }

  function closeInformerPopup() {
    setInformerPopupOpen(false);
    setMessageToUser('');
    if (popupIconSuccess) {
      setCredentials({ email: '', password: '' });
      history.push('/sing-in');
    }
    setPopupIconSuccess(false);
  }

<<<<<<< HEAD
  function handleUpdateAvatar(newAvatar) {
    appApi.setAvatar(newAvatar).then((updatedAvatar) => {
      setCurrentUser(updatedAvatar);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err.message);
    });;
  }

  function handleUpdateUser(newUserData) {
    appApi.setUserInfo(newUserData).then((updatedUserData) => {
      setCurrentUser(updatedUserData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err.message);
    });;
  }

  function handleAddPlaceSubmi(newCardData) {
    appApi.addCard(newCardData).then((addedCard) => {
      setCards([addedCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err.message);
    });;
  }



  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    appApi.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err.message);
    });;
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    appApi.deleteCard(card._id).then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.filter((c) => c._id !== card._id);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err.message);
    });;
  }


=======
  function handleLogin(e) {
    e.preventDefault();

    auth.authorize(credentials).then((data) => {
      if (!data) {
        openInformerPopup('Что-то пошло не так!');
        return;
      }

      if (data.message) {
        openInformerPopup(data.message);
        return;
      } else if (data.token) {
        setCredentials({ email: '', password: '' });
        handleLoggedIn(true);
        history.push('/');
      } else {
        openInformerPopup('Барабашка взял так и учудил конкретно :-)');
      }
    });
  }

  function handleRegister(e) {
    e.preventDefault();

    auth.register(credentials).then((data) => {
      if (!data) {
        openInformerPopup('Что-то пошло не так!');
        return;
      }

      if (data.error) {
        openInformerPopup(data.error);
        return;
      } else {
        openInformerPopup('Регистрация успешна!', true);
        // history.push('/sing-in');
        return;
      }
    });
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      if (token) {
        auth.getContent(token).then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            handleLoggedIn(true);
            history.push('/');
          }
        });
      }
    }

    // // Возвращаем функцию, которая удаляет эффекты
    // return () => {
    //   setUserEmail('');
    // };
  });
>>>>>>> develop

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in">
          <Header navLink="/sign-up" navTitle="Регистрация" />
          <Login
            credentials={credentials}
            onCredentialsChange={handleCredentialsChange}
            loginUser={handleLogin}
          />
        </Route>

        <Route path="/sign-up">
          <Header navLink="/sign-in" navTitle="Войти" />
          <Register
            credentials={credentials}
            onCredentialsChange={handleCredentialsChange}
            registerUser={handleRegister}
          />
        </Route>

        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRoute
            path="/"
            currentUser={currentUser}
            handleUser={handleUser}
            loggedIn={loggedIn}
            userEmail={userEmail}
            onLogout={handleLoggedIn}
            component={Dashboard}
          />
        </CurrentUserContext.Provider>
      </Switch>

      <InfoTooltip
        message={messageToUser}
        successIcon={popupIconSuccess}
        isOpen={isInformerPopupOpen}
        onClose={closeInformerPopup}
      />
    </div>
  );
}


export default App;
