import { Button, Flex, Heading, Select } from "@chakra-ui/react";

import { ScriptShema } from "../../../types/ScriptTypes/ScriptShema.types";
import { useEffect, useRef, useState } from "react";
import { addActionToScript } from "../../../hooks/reducer/scriptCreation/function";
import { Block } from "../../../types/ScriptTypes/Block.types";

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
    setScripts(myScripts);
  }, []);

  const scriptSelect = useRef<HTMLSelectElement>(null);

  const handleRunScript = () => {
    const [script] = scripts.filter(
      (el) => el.name == scriptSelect.current?.value
    );

    const parsedScript = addActionToScript(script);
    console.log(parsedScript);
    let i;
    for (i = 0; i < parsedScript.road.length; i++) {
      const action = parsedScript.road[i] as Block;
      console.log(action);
      action.action();
    }
  };

  return (
    <>
      <Heading>Run your custom script</Heading>
      <Flex gap={5}>
        <Select ref={scriptSelect} w={250}>
          {scripts.map((el, index) => {
            return <option key={index}>{el.name}</option>;
          })}
        </Select>
        <Button onClick={handleRunScript} colorScheme="blue">
          Run
        </Button>
      </Flex>
    </>
  );
};

export default Script;
