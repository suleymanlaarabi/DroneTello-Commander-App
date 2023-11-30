import { get } from "../../utils/fetch";
import config from "../../config.json";
const value = 10;
export async function avancer() {
  console.log("avancer");
  return get(config.host + "/avancer/" + value);
}

export async function reculer() {
  console.log("reculer");
  return get(config.host + "/reculer/" + value);
}

export async function droite() {
  console.log("droite");
  return get(config.host + "/droite/" + value);
}

export async function gauche() {
  console.log("gauche");
  return get(config.host + "/gauche/" + value);
}

export async function haut() {
  console.log("haut");
  return get(config.host + "/haut/" + value);
}

export async function bas() {
  console.log("bas");
  return get(config.host + "/bas/" + value);
}

export async function demarrer() {
  console.log("demarrer");
  return get(config.host + "/demarrer");
}

export async function arreter() {
  console.log("arreter");
  return get(config.host + "/arreter");
}
