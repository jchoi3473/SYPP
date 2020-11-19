
import React, { useEffect, useState } from 'react';
import useWindowPosition from './useWindowPosition';
import './modal.css'

export const ModalContext = React.createContext({});

const ModalProvider = ({ children }) => {
  const { windowPosition } = useWindowPosition();
  const [extensionId, setExtensionId] = useState(undefined);

  return (
    <ModalContext.Provider
      value={{
        windowPosition,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;