import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import logo from '../images/logo.svg';

function Header(props) {
  const userEmail = React.useContext(CurrentUserContext);
  const history = useHistory();

  function signOut() {
    localStorage.removeItem('token');
    props.onLogout(false);
    history.push('/sing-in');
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__bar">
        {props.loggedIn ? (
          <>
            <span className="header__text">{props.userEmail}</span>
            <button onClick={signOut} className="header__button">
              Выход
            </button>
          </>
        ) : (
          <Link to={props.navLink} className="header__link">
            {props.navTitle}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
