import config from "../../config.json";
import { get } from "../../utils/fetch";

export function abort() {
  return get(config.host + "/execution/abort");
}
