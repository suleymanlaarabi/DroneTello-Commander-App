import {
  Block,
  BlockName,
  BlockResult,
} from "../../../types/ScriptTypes/Block.types";
import { ScriptShema } from "../../../types/ScriptTypes/ScriptShema.types";
import { createActionPayload, moveArray } from "./function";
import { uid } from "uid";

interface Action<T extends string, P> {
  type: T;
  payload: P;
}

export enum ActionKind {
  ADD_BLOCK = "ADD_BLOCK",
  ADD_CUSTOM_BLOCK = "ADD_CUSTOM_BLOCK",
  REMOVE_BLOCK = "REMOVE_BLOCK",
  UPDATE_NAME = "UPDATE_NAME",
  MOVE_BLOCK = "MOVE_BLOCK",
  SET_SCRIPT = "SET_SCRIPT",
  RUN_SCRIPT = "RUN_SCRIPT",
}

export type PayloadAddBlock = {
  uid?: string;
  name: BlockName;
  time: number;
  distance: number;
  action?: () => Promise<BlockResult>;
};

export type PayloadAddCustomBlock = {
  name: string;
  time: number;
  customCode: string;
};

type ActionAddBlock = Action<ActionKind.ADD_BLOCK, PayloadAddBlock>;

type ActionAddCustomdBlock = Action<
  ActionKind.ADD_CUSTOM_BLOCK,
  PayloadAddCustomBlock
>;

type ActionSetScript = Action<ActionKind.SET_SCRIPT, ScriptShema>;

type ActionWithoutPayload = Action<ActionKind.RUN_SCRIPT, undefined>;

type ActionUpdateName = Action<
  ActionKind.UPDATE_NAME,
  {
    name: string;
  }
>;
type ActionRemoveBlock = Action<
  ActionKind.REMOVE_BLOCK,
  {
    uid: string;
  }
>;
type ActionMoveBlock = Action<
  ActionKind.MOVE_BLOCK,
  {
    positon: number;
    newPosition: number;
  }
>;

export type actionScriptCreationReducer =
  | ActionAddBlock
  | ActionUpdateName
  | ActionRemoveBlock
  | ActionMoveBlock
  | ActionSetScript
  | ActionWithoutPayload
  | ActionAddCustomdBlock;

function scriptCreationReducer(
  state: ScriptShema,
  action: actionScriptCreationReducer
) {
  const { type, payload } = action;
  const { road } = state;

  switch (type) {
    case ActionKind.ADD_BLOCK:
      if (!payload.action) {
        payload.action = createActionPayload(payload);
      }

      return {
        name: state.name,
        road: [
          ...state.road,
          {
            uid: uid(),
            name: payload.name,
            time: payload.time,
            distance: payload.distance,
            action: payload.action,
          } as Block,
        ],
      };
    case ActionKind.ADD_CUSTOM_BLOCK:
      return {
        name: state.name,
        road: [
          ...state.road,
          {
            uid: uid(),
            name: payload.name,
            time: payload.time,
            customCode: payload.customCode,
          } as Block,
        ],
      };
    case ActionKind.UPDATE_NAME:
      return {
        name: payload.name,
        road: [...state.road],
      };
    case ActionKind.REMOVE_BLOCK:
      return {
        name: state.name,
        road: state.road.filter((el) => el.uid != payload.uid),
      };
    case ActionKind.MOVE_BLOCK:
      return {
        name: state.name,
        road: moveArray(road, payload.newPosition, payload.positon),
      };
    case ActionKind.SET_SCRIPT:
      return payload;
  }
  return state;
}

export default scriptCreationReducer;
