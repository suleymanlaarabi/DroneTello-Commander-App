import { Block, BlockResult } from "../../../types/ScriptTypes/Block.types";
import { ScriptShema } from "../../../types/ScriptTypes/ScriptShema.types";
import { createActionPayload } from "./function";
import { uid } from "uid";

type actionString = "ADD_BLOCK" | "REMOVE_BLOCK" | "UPDATE_NAME";
export type PayloadScriptReducer = {
  uid?: number;
  name: string;
  time?: number;
  action?: () => BlockResult;
};
export type actionScriptCreationReducer = {
  type: actionString;
  payload: PayloadScriptReducer;
};

function scriptCreationReducer(
  state: ScriptShema,
  action: actionScriptCreationReducer
) {
  const payload = action.payload;

  switch (action.type) {
    case "ADD_BLOCK":
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
            action: payload.action,
          } as Block,
        ],
      };
    case "UPDATE_NAME":
      return {
        name: payload.name,
        road: [...state.road],
      };
  }
  return state;
}

export default scriptCreationReducer;
