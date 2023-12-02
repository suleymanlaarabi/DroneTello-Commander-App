import { positionProps } from "../types";
import { useFBX } from "@react-three/drei";

export function Drone({ position }: positionProps) {
  // This reference will give us direct access to the mesh

  const fbx = useFBX("/3DModel/Drone.fbx");
  fbx.position.x = position.x;
  fbx.position.y = position.y;
  fbx.position.z = position.z;

  return <primitive object={fbx} scale={0.003} />;
}
