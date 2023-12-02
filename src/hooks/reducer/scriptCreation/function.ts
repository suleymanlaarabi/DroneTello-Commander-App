import { Dispatch } from "react";
import { Executor } from "../../../components/views/CustomScript/CustomScriptExecutor";
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
import { PayloadAddBlock } from "./scriptCreationReducer";
import { droneAction } from "../3DScene/droneMoveReducer";
import { Executor3D } from "../3DScene/3DExecutor";

type Distance = number | undefined;

export function createActionPayload(currentPayload: PayloadAddBlock) {
  return createActionWithName(
    currentPayload.name as BlockName,
    currentPayload.distance
  );
}

export function createActionWithName(name: BlockName, distance: Distance) {
  let action: (() => Promise<BlockResult>) | undefined;
  switch (name) {
    case BlockName.Avancer:
      action = async () => {
        return avancer(distance);
      };
      break;
    case BlockName.Reculer:
      action = async () => {
        return reculer(distance);
      };
      break;
    case BlockName.Droite:
      action = async () => {
        return droite(distance);
      };
      break;
    case BlockName.Gauche:
      action = async () => {
        return gauche(distance);
      };
      break;
    case BlockName.Arreter:
      action = async () => {
        return arreter();
      };
      break;
    case BlockName.Demarrer:
      action = async () => {
        return demarrer();
      };
      break;
    default:
      action = undefined;
      break;
  }
  return action;
}
export function addActionToScript(script: ScriptShema): ScriptShema {
  const newRoad: Block[] = [];
  script.road.forEach((el) => {
    newRoad.push({
      ...el,
      action: createActionWithName(el.name as BlockName, el.distance),
    });
  });
  const newScript = {
    name: script.name,
    road: newRoad,
  };
  return newScript;
}

export function moveArray<T>(
  Road: T[],
  position: number,
  newPosition: number
): T[] {
  // Vérifier que les positions sont valides
  if (
    position < 0 ||
    position >= Road.length ||
    newPosition < 0 ||
    newPosition >= Road.length
  ) {
    return Road;
  }

  // Copier le Road pour éviter de modifier l'original directement
  const nouveauRoad = [...Road];

  // Stocker l'élément à la position initiale
  const elementDeplace = nouveauRoad[position];

  // Supprimer l'élément de la position initiale
  nouveauRoad.splice(position, 1);

  // Insérer l'élément à la nouvelle position
  nouveauRoad.splice(newPosition, 0, elementDeplace);

  return nouveauRoad;
}
export async function sleep(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time));
  return;
}
export async function runScript(
  script: ScriptShema,
  callback: (name: string) => void,
  dispatchDroneState?: Dispatch<droneAction>
) {
  const { road } = script;

  if (dispatchDroneState != undefined) {
    Executor3D(road, dispatchDroneState, callback);
    return;
  }
  console.log(road);
  for (const block of road) {
    callback(block.uid);
    if (block.action) {
      block.action(undefined);
    } else if (block.customCode) {
      await Executor(block.customCode);
    }
    await sleep(block.time);
  }
  callback("");
  return;
}
