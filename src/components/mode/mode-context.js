import React, { useEffect, useState } from 'react';

const ModeContext = React.createContext({
  mode: '',
  modeChangeHandler: () => {},
});

export const ModeContextProvider = (props) => {
  const storedMode = localStorage.getItem('Mode');
  const initialMode = storedMode ? JSON.parse(storedMode) : false;

  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    localStorage.setItem('Mode', JSON.stringify(mode));
  }, [mode]);

  const modeChangeHandler = () => {
    setMode((prevMode) => !prevMode);
  };

  console.log(mode);

  return (
    <ModeContext.Provider value={{ mode, onModeChange: modeChangeHandler }}>
      {props.children}
    </ModeContext.Provider>
  );
};
export default ModeContext;
