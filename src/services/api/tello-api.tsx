import { get } from "../../utils/fetch";
import config from "../../config.json";
import { BlockName } from "../../types/ScriptTypes/Block.types";

const defaultDistance = 35;

const actionWithoutDistance = [
  BlockName.Demarrer,
  BlockName.Arreter,
  BlockName.Emergency,
];

export async function moveAction(
  action: BlockName,
  distance?: number | undefined
) {
  if (actionWithoutDistance.includes(action)) {
    return await get(config.host + "/tello/" + action);
  } else {
    return await get(
      config.host +
        "/tello/" +
        action +
        "/" +
        JSON.stringify(distance ? distance : defaultDistance)
    );
  }
}

export async function avancer(value: number | undefined) {
  return moveAction(BlockName.Avancer, value);
}

export async function reculer(value: number | undefined) {
  return moveAction(BlockName.Reculer, value);
}

export async function droite(value: number | undefined) {
  return moveAction(BlockName.Droite, value);
}

export async function gauche(value: number | undefined) {
  return moveAction(BlockName.Gauche, value);
}

export async function haut(value: number | undefined) {
  return moveAction(BlockName.Haut, value);
}

export async function bas(value: number | undefined) {
  return moveAction(BlockName.Bas, value);
}

export async function demarrer() {
  return moveAction(BlockName.Demarrer, undefined);
}

export async function arreter() {
  return moveAction(BlockName.Arreter, undefined);
}
export async function emergency() {
  return moveAction(BlockName.Emergency, undefined);
}
