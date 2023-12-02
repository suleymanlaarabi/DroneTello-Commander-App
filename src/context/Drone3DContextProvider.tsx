import { PropsWithChildren, useReducer } from "react";
import { Drone3DContext } from "./createContext/Drone3DContext";
import { droneMoveReducer } from "../hooks/reducer/3DScene/droneMoveReducer";

const Drone3DContextProvider = ({ children }: PropsWithChildren) => {
  const [droneState, dispatchDroneState] = useReducer(droneMoveReducer, {
    x: 0,
    y: 0,
    z: 0,
  });
  return (
    <Drone3DContext.Provider
      value={{
        droneState,
        dispatchDroneState,
      }}
    >
      {children}
    </Drone3DContext.Provider>
  );
};

export default Drone3DContextProvider;
