import React from 'react';
import { Link } from 'react-router-dom';


import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />

      <Link to={props.navLink} className="header__link">
        {props.navTitle}
      </Link>
    </header>
  );
}

export default Header;
