import { Button, Flex, Select } from "@chakra-ui/react";
import { useScript } from "../../../hooks/useScript";
import { useRef } from "react";
import { ScriptShema } from "../../../types/ScriptTypes/ScriptShema.types";

const RootUi = () => {
  const { scripts, start3DViewScript } = useScript();

  const selectRef = useRef<HTMLSelectElement>(null);

  const handleUP = async () => {
    start3DViewScript(
      scripts.filter(
        (el) => el.name == selectRef.current?.value
      )[0] as ScriptShema
    );
  };
  return (
    <Flex m={3} gap={4}>
      <Select ref={selectRef}>
        {scripts.map((el, key) => {
          return (
            <option key={key} value={el.name}>
              {el.name}
            </option>
          );
        })}
      </Select>
      <Button onClick={handleUP}>Run</Button>
    </Flex>
  );
};

export default RootUi;
