import { positionProps } from "../types";

export function Plane({ position }: positionProps) {
  return (
    <mesh position={[position.x, position.y, position.z]}>
      <boxGeometry args={[40, 1, 40]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}
