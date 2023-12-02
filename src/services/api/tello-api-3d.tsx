import { Dispatch } from "react";
import {
  droneAction,
  droneActionKind,
} from "../../hooks/reducer/3DScene/droneMoveReducer";
import { sleep } from "../../hooks/reducer/scriptCreation/function";

export async function smoothDroneMove(dispatchDrone: () => void) {
  for (let i = 0; i < 10; i++) {
    dispatchDrone();
    await sleep(25);
  }
}

export async function avancer3D(
  dispatch: Dispatch<droneAction>,
  distance: number
) {
  return smoothDroneMove(() =>
    dispatch({
      type: droneActionKind.MOVE_FORWARD,
      payload: distance / 1000,
    })
  );
}

export async function reculer3D(
  dispatch: Dispatch<droneAction>,
  distance: number
) {
  return smoothDroneMove(() =>
    dispatch({
      type: droneActionKind.MOVE_BACKWARD,
      payload: distance / 1000,
    })
  );
}

export async function droite3D(
  dispatch: Dispatch<droneAction>,
  distance: number
) {
  return smoothDroneMove(() =>
    dispatch({
      type: droneActionKind.MOVE_RIGHT,
      payload: distance / 1000,
    })
  );
}

export async function gauche3D(
  dispatch: Dispatch<droneAction>,
  distance: number
) {
  return smoothDroneMove(() =>
    dispatch({
      type: droneActionKind.MOVE_LEFT,
      payload: distance / 1000,
    })
  );
}

export async function haut3D(
  dispatch: Dispatch<droneAction>,
  distance: number
) {
  return smoothDroneMove(() =>
    dispatch({
      type: droneActionKind.MOVE_UP,
      payload: distance / 1000,
    })
  );
}

export async function bas3D(dispatch: Dispatch<droneAction>, distance: number) {
  return smoothDroneMove(() =>
    dispatch({
      type: droneActionKind.MOVE_DOWN,
      payload: distance / 1000,
    })
  );
}

export async function demarrer3D(dispatch: Dispatch<droneAction>) {
  return dispatch({
    type: droneActionKind.MOVE_FORWARD,
    payload: 0.1,
  });
}

export async function arreter3D(dispatch: Dispatch<droneAction>) {
  return dispatch({
    type: droneActionKind.MOVE_FORWARD,
    payload: 0.1,
  });
}
export async function emergency3D(dispatch: Dispatch<droneAction>) {
  return dispatch({
    type: droneActionKind.MOVE_FORWARD,
    payload: 0.1,
  });
}
