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
        <ScreenshotTrigger trigger={triggerScreenshot} setTrigger={setTriggerScreenshot} />
        <directionalLight position={[10, 20, -20]} intensity={2} />
        <ambientLight intensity={1} />
        <color attach="background" args={[bgColor]} />
        <Box scale={4}>
          <meshStandardMaterial color={fgColor} />
        </Box>
        <OrbitControls />
      </Canvas>
      <button onClick={() => setTriggerScreenshot(true)}>Download Image</button>
    </>
  );
};

export default App;
