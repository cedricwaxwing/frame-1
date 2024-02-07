'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import './App.css';
import ScreenshotTrigger from './ScreenshotTrigger';

const App = () => {
  const [triggerScreenshot, setTriggerScreenshot] = useState(false);
  const [bgColor, setBgColor] = useState('ff0000');
  const [fgColor, setFgColor] = useState('0000ff');
  const [imageDataURI, setImageDataURI] = useState('');

  const captureCanvasAsDataURI = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const dataURI = canvas.toDataURL('image/png');
      return dataURI;
    }
    return null;
  };

  const captureCanvas = () => {
    const dataURI = captureCanvasAsDataURI();
    setImageDataURI(dataURI);
    console.log(dataURI);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const bg = queryParams.get('bg');
    if (bg) {
      setBgColor(`#${bg}`);
    }

    const fg = queryParams.get('fg');
    if (fg) {
      setFgColor(`#${fg}`);
    }
  }, []);

  return (
    <>
      <Canvas
        style={{ width: '100vw', height: '75vh' }}
        camera={{ position: [5, 5, 5] }}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
        }}
      >
        <directionalLight position={[10, 20, -20]} intensity={2} />
        <ambientLight intensity={1} />
        <color attach="background" args={[bgColor]} />
        <Box scale={4}>
          <meshStandardMaterial color={fgColor} />
        </Box>
        <OrbitControls />
      </Canvas>
      <button onClick={captureCanvas}>Download Image</button>
    </>
  );
};

export default App;
