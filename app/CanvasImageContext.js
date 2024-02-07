// Create a new file: CanvasImageContext.js
import React, { createContext, useContext, useState } from 'react';

const CanvasImageContext = createContext();

export const useCanvasImage = () => useContext(CanvasImageContext);

export const CanvasImageProvider = ({ children }) => {
  const [imageDataURI, setImageDataURI] = useState('');

  return (
    <CanvasImageContext.Provider value={{ imageDataURI, setImageDataURI }}>
      {children}
    </CanvasImageContext.Provider>
  );
};
