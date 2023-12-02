import { sleep } from "../../../hooks/reducer/scriptCreation/function";
import {
  avancer,
  reculer,
  emergency,
  arreter,
  droite,
  gauche,
  haut,
  bas,
  demarrer,
} from "../../../services/api/tello-api";

({
  avancer,
  reculer,
  emergency,
  arreter,
  droite,
  gauche,
  haut,
  bas,
  demarrer,
  sleep,
});

const codeBefore = "(async ()=>{";
const codeAfter = " return;})()";
export async function Executor(code: string) {
  await eval(codeBefore + code + codeAfter);
  return;
}
