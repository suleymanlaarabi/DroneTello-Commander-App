import { get } from "../../utils/fetch";
import config from "../../config.json";
const value = 10;
export async function avancer() {
  return get(config.host + "/avancer/" + value);
}

export async function reculer() {
  return get(config.host + "/reculer/" + value);
}

export async function droite() {
  return get(config.host + "/droite/" + value);
}

export async function gauche() {
  return get(config.host + "/gauche/" + value);
}

export async function haut() {
  return get(config.host + "/haut/" + value);
}

export async function bas() {
  return get(config.host + "/bas/" + value);
}

export async function demarrer() {
  return get(config.host + "/demarrer");
}

export async function arreter() {
  return get(config.host + "/arreter");
}
