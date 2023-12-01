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
});

const codeBefore = "(async ()=>{";
const codeAfter = "})()";
export async function Executor(code: string) {
  await eval(codeBefore + code + codeAfter);
}
