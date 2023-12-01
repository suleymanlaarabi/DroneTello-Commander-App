import { Button, Flex } from "@chakra-ui/react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { suggestions } from "./snipets";
import { Executor } from "./CustomScriptExecutor";
const CustomScript = () => {
  const monaco = useMonaco();
  const [code, setCode] = useState("");

  useEffect(() => {
    if (monaco) {
      monaco.languages.registerCompletionItemProvider("javascript", {
        provideCompletionItems: () => {
          return {
            suggestions: suggestions(monaco.languages),
          };
        },
      });
    }
  }, [monaco]);

  const handleRun = () => {
    Executor(code);
  };
  return (
    <Flex wrap={"wrap"} w={"100%"} height={"85vh"}>
      <Flex gap={4} w={"100%"}>
        <Button onClick={handleRun} w={"100%"}>
          Run
        </Button>
        <Button onClick={handleRun} w={"100%"}>
          Save
        </Button>
        <Button onClick={handleRun} w={"100%"}>
          Load
        </Button>
      </Flex>
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
    </Flex>
  );
};

export default CustomScript;
