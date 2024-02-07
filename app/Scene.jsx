import { Box } from "@react-three/drei";

const Scene = () => {
  return (
    <>
      <color attach='background' args={["red"]} />
      <directionalLight position={[10, 5, 20]} />
      <Box scale={3}>
        <meshStandardMaterial color='blue' />
      </Box>
    </>
  );
};

export default Scene;
