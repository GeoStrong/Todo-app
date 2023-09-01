import { Fragment } from 'react';
import { useContext, useEffect } from 'react';
import bgLightDesctop from '../src/assets/bg-desktop-light.jpg';
import bgLightMobile from '../src/assets/bg-mobile-light.jpg';
import Main from './components/Main/Main';
import ModeContext from './components/mode/mode-context';

const App = () => {
  const { mode } = useContext(ModeContext);
  const root = document.documentElement;

  const setDarkMode = () => {
    [
      '--background-img',
      '--box-shadow',
      '--color-border',
      '--color-background',
      '--color-input',
      '--color-todo-text',
      '--color-secondary',
      '--background-mobile-img',
    ].forEach((variable) => root.style.removeProperty(variable));
  };

  const setLightMode = () => {
    root.style.setProperty('--background-img', `url(${bgLightDesctop})`);
    root.style.setProperty('--background-mobile-img', `url(${bgLightMobile})`);
    root.style.setProperty(
      '--box-shadow',
      '0px 35px 50px -15px rgba(194, 195, 214, 0.50)'
    );
    root.style.setProperty('--color-border', `#e4e5f1`);
    root.style.setProperty('--color-background', `#fafafa`);
    root.style.setProperty('--color-input', `#fff`);
    root.style.setProperty('--color-todo-text', `#494C6B`);
    root.style.setProperty('--color-secondary', `#9495A5`);
    root.style.setProperty('--color-button-hover', `#3f404e`);
  };

  if (mode) setLightMode();
  if (!mode) setDarkMode();

  return (
    <Fragment>
      <Main />
    </Fragment>
  );
};

export default App;
