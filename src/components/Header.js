import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />

      <a href={props.navLink} className="header__link">
        {props.navTitle}
      </a>
    </header>
  );
}

export default Header;
