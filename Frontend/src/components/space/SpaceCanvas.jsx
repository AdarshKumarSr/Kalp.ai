import { Canvas } from "@react-three/fiber";
import Planet from "./Planet";

export default function SpaceCanvas({ planets = [], clearColor = "transparent" }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 45 }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "auto",
      }}
      gl={{ alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(clearColor, clearColor === "transparent" ? 0 : 1);
      }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      {planets.map((planet, i) => (
        <Planet key={i} {...planet} />
      ))}
    </Canvas>
  );
}