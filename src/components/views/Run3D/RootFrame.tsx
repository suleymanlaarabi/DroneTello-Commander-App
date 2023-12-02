import { Canvas } from "@react-three/fiber";
import { Drone } from "./Object/Drone";
import RootUi from "./RootUi";
import { useContext } from "react";
import {
  Drone3DContext,
  droneContextTypes,
} from "../../../context/createContext/Drone3DContext";
import { Plane } from "./Object/Plane";
import { Stats, OrbitControls } from "@react-three/drei";
import { Flex } from "@chakra-ui/react";

const RootFrame = () => {
  const { droneState } = useContext(Drone3DContext) as droneContextTypes;
  return (
    <>
      <Flex
        height={"89vh"}
        w={"100%"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <RootUi />
        <Canvas
          style={{
            minHeight: "90%",
            minWidth: "90%",
          }}
          camera={{
            position: [0, 0, 3],
          }}
        >
          <OrbitControls enableDamping={false} />
          <Stats />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Drone position={droneState} />
          <Plane
            position={{
              x: 0,
              y: -2.5,
              z: 0,
            }}
          />
        </Canvas>
      </Flex>
    </>
  );
};

export default RootFrame;
