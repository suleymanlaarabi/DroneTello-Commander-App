export enum droneActionKind {
  MOVE_UP = "MOVE_UP",
  MOVE_DOWN = "MOVE_DOWN",
  MOVE_FORWARD = "MOVE_FORWARD",
  MOVE_BACKWARD = "MOVE_BACKWARD",
  MOVE_RIGHT = "MOVE_RIGHT",
  MOVE_LEFT = "MOVE_LEFT",
}

export type droneState = {
  x: number;
  y: number;
  z: number;
};

export type droneAction = {
  type: droneActionKind;
  payload: number;
};

export function droneMoveReducer(state: droneState, action: droneAction) {
  const { payload } = action;
  switch (action.type) {
    case droneActionKind.MOVE_UP:
      return {
        ...state,
        y: state.y + payload,
      };
    case droneActionKind.MOVE_DOWN:
      return {
        ...state,
        y: state.y - payload,
      };
    case droneActionKind.MOVE_FORWARD:
      return {
        ...state,
        z: state.z + payload,
      };
    case droneActionKind.MOVE_BACKWARD:
      return {
        ...state,
        z: state.z - payload,
      };
    case droneActionKind.MOVE_RIGHT:
      return {
        ...state,
        x: state.x + payload,
      };
    case droneActionKind.MOVE_LEFT:
      return {
        ...state,
        x: state.x - payload,
      };
  }
  return state;
}
