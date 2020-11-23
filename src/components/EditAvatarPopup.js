import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
  const avaRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную


  function handleChangeAva(e) {
    avaRef.current.value = e.target.value;
  }


  function handleSubmit(e) {
    e.preventDefault();

    if (avaRef.current.value) {
      props.onUpdateAvatar({
        avatar: avaRef.current.value,
      });
    } else {
      props.onClose();
    }
  }


  return (
    <PopupWithForm
      title = "Обновить аватар"
      name = "avatar"
      btnTitle = "Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input onChange={handleChangeAva} ref={avaRef} type="url" className="form__text-input" name="avatar" defaultValue="" placeholder="Ссылка на аватарку" id="avatar" required />
      <span className="form__input-error" id="avatar-error"></span>
    </PopupWithForm>
  );
}


export default EditAvatarPopup;
