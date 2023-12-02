import { Button, Flex, Input } from "@chakra-ui/react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { suggestions } from "./snipets";
import { Executor } from "./CustomScriptExecutor";
import { useBlock } from "../../../hooks/useBlock";
import { uid } from "uid";

import CustomBlockCard from "../../common/Card/CustomBlockCard";
let editorPhase = 0;
const CustomScript = () => {
  const monaco = useMonaco();
  const [code, setCode] = useState("");

  useEffect(() => {
    if (monaco && editorPhase == 0) {
      editorPhase++;
      monaco.languages.registerCompletionItemProvider("javascript", {
        provideCompletionItems: () => {
          return {
            suggestions: suggestions(monaco.languages),
          };
        },
      });
    }
  }, [monaco]);

  const { blocks, addBlock } = useBlock();

  const handleRun = () => {
    Executor(code);
  };
  const nameRef = useRef(null);
  const handleSave = () => {
    if (nameRef.current.value.length < 3) {
      return;
    }
    addBlock({
      name: nameRef.current.value,
      action: () => {},
      customCode: code,
      distance: undefined,
      time: 0,
      uid: uid(),
    });
  };
  const handleBlockSelect = (customCode, name) => {
    nameRef.current.value = name;
    setCode(customCode);
  };

  return (
    <Flex gap={3} wrap={"wrap"} w={"100%"} height={"85vh"}>
      <Flex gap={4} w={"100%"}>
        <Button onClick={handleRun} w={"100%"}>
          Run
        </Button>
        <Button onClick={handleSave} w={"100%"}>
          Save
        </Button>
      </Flex>
      <Input placeholder="Name" type="text" ref={nameRef} />
      <Editor
        height="80%"
        width={"100%"}
        theme="vs-dark"
        language="javascript"
        value={code}
        onChange={setCode}
        options={{
          fontSize: "16px",
          formatOnType: true,
          autoClosingBrackets: true,
          minimap: { scale: 10 },
        }}
      />
      {blocks.map((el) => {
        return (
          <CustomBlockCard
            key={el.uid}
            onClick={() => handleBlockSelect(el.customCode, el.name)}
            name={el.name}
            uid={el.uid}
          />
        );
      })}
    </Flex>
  );
};

export default CustomScript;
