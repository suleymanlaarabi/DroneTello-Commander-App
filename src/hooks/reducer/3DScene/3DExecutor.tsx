import { Dispatch } from "react";
import { Block, BlockName } from "../../../types/ScriptTypes/Block.types";
import { droneAction } from "./droneMoveReducer";
import { sleep } from "../scriptCreation/function";

import {
  avancer3D,
  reculer3D,
  emergency3D,
  arreter3D,
  droite3D,
  gauche3D,
  haut3D,
  bas3D,
  demarrer3D,
} from "../../../services/api/tello-api-3d";

export async function Executor3D(
  road: Block[],
  dispatchDroneState: Dispatch<droneAction>,
  callback: (name: string) => void
) {
  console.log(road);
  for (const block of road) {
    callback(block.uid);
    if (block.action) {
      switch (block.name) {
        case BlockName.Avancer:
          await avancer3D(dispatchDroneState, block.distance as number);
          break;
        case BlockName.Reculer:
          await reculer3D(dispatchDroneState, block.distance as number);
          break;
        case BlockName.Droite:
          await droite3D(dispatchDroneState, block.distance as number);
          break;
        case BlockName.Gauche:
          await gauche3D(dispatchDroneState, block.distance as number);
          break;
        case BlockName.Haut:
          await haut3D(dispatchDroneState, block.distance as number);
          break;
        case BlockName.Bas:
          await bas3D(dispatchDroneState, block.distance as number);
          break;
      }
    } else if (block.customCode) {
      console.log("customCode : ", block.customCode);
      const avancer = async (distance: number) =>
        await avancer3D(dispatchDroneState, distance);
      const reculer = async (distance: number) =>
        await reculer3D(dispatchDroneState, distance);
      const droite = async (distance: number) =>
        await droite3D(dispatchDroneState, distance);
      const gauche = async (distance: number) =>
        await gauche3D(dispatchDroneState, distance);
      const haut = async (distance: number) =>
        await haut3D(dispatchDroneState, distance);
      const bas = async (distance: number) =>
        await bas3D(dispatchDroneState, distance);
      const emergency = async () => await emergency3D(dispatchDroneState);
      const demarrer = async () => await demarrer3D(dispatchDroneState);
      const arreter = async () => await arreter3D(dispatchDroneState);
      ({
        avancer,
        reculer,
        droite,
        gauche,
        haut,
        bas,
        emergency,
        demarrer,
        arreter,
      });
      await eval("(async ()=>{" + block.customCode + "})()");
    }
    await sleep(block.time);
  }
  callback("");
}
