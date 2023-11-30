import { useState } from "react";
import { ScriptShema } from "../types/ScriptTypes/ScriptShema.types";
import { addActionToScript } from "./reducer/scriptCreation/function";

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

  const addScript = (script: ScriptShema) => {
    localStorage.setItem("script", JSON.stringify([...scripts, script]));
    setScripts((current) => [...current, script]);
  };
  return {
    scripts,
    addScript,
  };
}
