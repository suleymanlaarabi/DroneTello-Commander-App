import { Dispatch, createContext } from "react";
import {
  droneAction,
  droneState,
} from "../../hooks/reducer/3DScene/droneMoveReducer";

export type droneContextTypes = {
  droneState: droneState;
  dispatchDroneState: Dispatch<droneAction>;
};

export const Drone3DContext = createContext<{
  droneState?: droneState;
  dispatchDroneState?: Dispatch<droneAction>;
}>({
  droneState: {
    x: 0,
    y: 0,
    z: 0,
  },
});
