import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
  const avaRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную


  function handleChangeAva(e) {
    avaRef.current.value = e.target.value;
  }
  

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar({
      avatar: avaRef.current.value
    });
  }


  return (
    <>
      <PopupWithForm
        title = "Обновить аватар"
        name = "avatar"
        btnTitle = "Сохранить"
        inputs = {
          <>
            <input onChange={handleChangeAva} ref={avaRef} type="url" className="form__text-input" name="avatar" defaultValue="" placeholder="Ссылка на аватарку" id="avatar" required />
            <span className="form__input-error" id="avatar-error"></span>
          </>
        }
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default EditAvatarPopup;
  