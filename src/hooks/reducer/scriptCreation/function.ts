import {
  arreter,
  avancer,
  demarrer,
  droite,
  gauche,
  reculer,
} from "../../../services/api/tello-api";
import {
  Block,
  BlockName,
  BlockResult,
} from "../../../types/ScriptTypes/Block.types";
import { ScriptShema } from "../../../types/ScriptTypes/ScriptShema.types";
import { PayloadScriptReducer } from "./scriptCreationReducer";

export function createActionPayload(
  currentPayload: PayloadScriptReducer
): () => BlockResult {
  return createActionWithName(currentPayload.name as BlockName);
}

export function createActionWithName(name: BlockName) {
  let newPayloadAction: () => BlockResult;
  const payloadActionTemplate = (action: () => Promise<BlockResult>) => {
    action();
    return {
      isError: false,
      result: "ok",
    };
  };
  switch (name) {
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
    case BlockName.Arreter:
      newPayloadAction = newPayloadAction = () => {
        return payloadActionTemplate(arreter);
      };
      break;
    case BlockName.Demarrer:
      newPayloadAction = newPayloadAction = () => {
        return payloadActionTemplate(demarrer);
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

export function addActionToScript(script: ScriptShema) {
  const newRoad: Block[] = [];
  script.road.forEach((el) => {
    newRoad.push({
      ...el,
      action: createActionWithName(el.name as BlockName),
    });
  });
  const newScript = {
    name: script.name,
    road: newRoad,
  };

  return newScript;
}
