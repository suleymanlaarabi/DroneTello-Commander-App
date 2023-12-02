import { useContext, useState } from "react";
import { ScriptShema } from "../types/ScriptTypes/ScriptShema.types";
import {
  addActionToScript,
  runScript,
} from "./reducer/scriptCreation/function";
import {
  Drone3DContext,
  droneContextTypes,
} from "../context/createContext/Drone3DContext";

export function useScript() {
  const localStorageScript = localStorage.getItem("script");

  const [scripts, setScripts] = useState<ScriptShema[]>(
    localStorageScript
      ? (JSON.parse(localStorageScript) as ScriptShema[]).map((script) => {
          return addActionToScript(script);
        })
      : [
          {
            name: "Aucun Script",
            road: [],
          },
        ]
  );

  const { dispatchDroneState } = useContext(
    Drone3DContext
  ) as droneContextTypes;

  const start3DViewScript = (script: ScriptShema) => {
    runScript(
      script,
      (name) => {
        console.log(name);
      },
      dispatchDroneState
    );
  };

  const addScript = (script: ScriptShema) => {
    const newScripts = scripts.filter((el) => el.name != script.name);
    localStorage.setItem("script", JSON.stringify([...newScripts, script]));
    setScripts([...newScripts, script]);
  };
  const removeScript = (script: ScriptShema) => {
    setScripts((current) => current.filter((el) => el.name != script.name));
    localStorage.setItem(
      "script",
      JSON.stringify(scripts.filter((el) => el.name != script.name))
    );
  };
  return {
    scripts,
    addScript,
    removeScript,
    start3DViewScript,
  };
}
