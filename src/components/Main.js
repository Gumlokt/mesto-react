import React from 'react';
// import profileAvatar from '../images/cousteau.jpg';
import { appApi } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {
  const curUser = React.useContext(CurrentUserContext);

  // const [userAvatar, setUserAvatar] = React.useState(profileAvatar);
  // const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  // const [userDescription, setUserDescription] = React.useState('Исследователь океана');
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


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <button onClick={props.onEditAvatar} className="profile__btn-edit-avatar">
            <img src={curUser.avatar} alt="Аватарка (фото) владельца профиля" className="profile__avatar" />
          </button>

          <div className="profile__info">
            <h1 className="profile__name">{curUser.name}</h1>

            <button onClick={props.onEditProfile} className="profile__btn-edit" type="button" aria-label="Открыть окно редактирования профиля"></button>

            <p className="profile__about">{curUser.about}</p>
          </div>
        </div>

        <button onClick={props.onAddPlace} className="profile__btn-add" type="button" aria-label="Открыть окно добавления новой карточки"></button>
      </section>


      <section className="elements">{cards.map((item) => (
        <Card
          card={item}
          onCardClick={props.onCardClick}
          key={item._id}
        />
      ))}</section>
    </main>
  );
}

export default Main;
