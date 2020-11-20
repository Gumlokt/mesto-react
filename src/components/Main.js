import React from 'react';
import { appApi } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    Promise.all([ //в Promise.all передаем массив промисов которые нужно выполнить
      appApi.getInitialCards()
    ])
    .then((values) => { //попадаем сюда когда массив промисов будут выполнены
      const [ initialCards ] = values;
      setCards(initialCards);
    })
    .catch((err) => { //попадаем сюда если хотя бы один из промисов завершится ошибкой
      console.log(err.message);
    });
  }, []);


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    appApi.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
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
    // console.log(card);
  }


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <button onClick={props.onEditAvatar} className="profile__btn-edit-avatar">
            <img src={currentUser.avatar} alt="Аватарка (фото) владельца профиля" className="profile__avatar" />
          </button>

          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>

            <button onClick={props.onEditProfile} className="profile__btn-edit" type="button" aria-label="Открыть окно редактирования профиля"></button>

            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>

        <button onClick={props.onAddPlace} className="profile__btn-add" type="button" aria-label="Открыть окно добавления новой карточки"></button>
      </section>


      <section className="elements">{cards.map((item) => (
        <Card
          card={item}
          onCardClick={props.onCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          key={item._id}
        />
      ))}</section>
    </main>
  );
}

export default Main;
