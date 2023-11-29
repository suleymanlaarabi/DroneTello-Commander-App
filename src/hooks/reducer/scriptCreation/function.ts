import {
  avancer,
  droite,
  gauche,
  reculer,
} from "../../../services/api/tello-api";
import { BlockName, BlockResult } from "../../../types/ScriptTypes/Block.types";
import { PayloadScriptReducer } from "./scriptCreationReducer";

export function createActionPayload(
  currentPayload: PayloadScriptReducer
): () => BlockResult {
  let newPayloadAction: () => BlockResult;
  const payloadActionTemplate = (action: () => Promise<BlockResult>) => {
    action();
    return {
      isError: false,
      result: "ok",
    };
  };
  switch (currentPayload.name) {
    case BlockName.Avancer:
      newPayloadAction = () => {
        return payloadActionTemplate(avancer);
      };
      break;
    case BlockName.Reculer:
      newPayloadAction = () => {
        return payloadActionTemplate(reculer);
      };
      break;
    case BlockName.Droite:
      newPayloadAction = newPayloadAction = () => {
        return payloadActionTemplate(droite);
      };
      break;
    case BlockName.Gauche:
      newPayloadAction = newPayloadAction = () => {
        return payloadActionTemplate(gauche);
      };
      break;
    default:
      newPayloadAction = () => ({
        isError: false,
        result: "ok",
      });
  }
  return newPayloadAction;
}
