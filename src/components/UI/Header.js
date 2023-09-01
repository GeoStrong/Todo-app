import './Header.css';
import sunIcon from '../../assets/icon-sun.svg';
import moonIcon from '../../assets/icon-moon.svg';
import { useContext } from 'react';
import ModeContext from '../mode/mode-context';

const Header = () => {
  const { mode, onModeChange } = useContext(ModeContext);

  return (
    <header className="container__header">
      <h1 className="header__title">TODO</h1>
      <button
        className="btn-reset header__button button-hover"
        onClick={onModeChange}
      >
        <img src={mode ? moonIcon : sunIcon} alt="mode" />
      </button>
    </header>
  );
};

export default Header;
