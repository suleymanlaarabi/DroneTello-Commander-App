import { Heading, Select } from "@chakra-ui/react";

import { ScriptShema } from "../../../types/ScriptTypes/ScriptShema.types";
import { useEffect, useState } from "react";

const Script = () => {
  const [scripts, setScripts] = useState<ScriptShema[]>([]);
  useEffect(() => {
    const localStorageScript = localStorage.getItem("script");
    const myScripts: ScriptShema[] = localStorageScript
      ? JSON.parse(localStorageScript)
      : [
          {
            name: "Aucun Script",
            road: [],
          },
        ];
    console.log(myScripts);
    setScripts(myScripts);
  }, []);

  return (
    <>
      <Heading>Run your custom script</Heading>
      <Select>
        {scripts.map((el, index) => {
          return <option key={index}>{el.name}</option>;
        })}
      </Select>
    </>
  );
};

export default Script;
