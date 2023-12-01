import { LaunchActionType } from "../components/views/ControlPad/ControlPad";
import {
  arreter,
  avancer,
  bas,
  demarrer,
  droite,
  emergency,
  gauche,
  haut,
  reculer,
} from "../services/api/tello-api";
import { BlockName } from "../types/ScriptTypes/Block.types";

export function handleMoveTello(
  name: BlockName,
  launchAction: LaunchActionType
) {
  switch (name) {
    case BlockName.Avancer:
      launchAction(avancer);
      break;
    case BlockName.Reculer:
      launchAction(reculer);
      break;
    case BlockName.Droite:
      launchAction(droite);
      break;
    case BlockName.Gauche:
      launchAction(gauche);
      break;
    case BlockName.Demarrer:
      launchAction(demarrer);
      break;
    case BlockName.Arreter:
      launchAction(arreter);
      break;
    case BlockName.Haut:
      launchAction(haut);
      break;
    case BlockName.Bas:
      launchAction(bas);
      break;
    case BlockName.Emergency:
      launchAction(emergency);
      break;
  }
}
