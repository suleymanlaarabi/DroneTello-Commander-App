import { Button, Flex, Heading, Input, Select, Text } from "@chakra-ui/react";
import { useReducer, useRef, useState } from "react";
import scriptCreationReducer, {
  ActionKind,
} from "../../../hooks/reducer/scriptCreation/scriptCreationReducer";
import { CreateBlockModal } from "../../common/Modal/CreateBlockModal";
import useModal from "../../../hooks/useModal";
import { BlockName } from "../../../types/ScriptTypes/Block.types";
import BlockCard from "../../common/Card/BlockCard";
import { addActionToScript } from "../../../hooks/reducer/scriptCreation/function";
import { useScript } from "../../../hooks/useScript";
import { AnimatePresence } from "framer-motion";
const Script = () => {
  const { scripts, addScript } = useScript();

  const [script, dispatch] = useReducer(scriptCreationReducer, scripts[0]);
  const [scriptName, setScriptName] = useState("");

  const { Modal, onOpen } = useModal(CreateBlockModal);

  const handleBlockAdd = (name: BlockName, time: number, distance: number) => {
    dispatch({
      type: ActionKind.ADD_BLOCK,
      payload: {
        name: name,
        time: time,
        distance: distance,
      },
    });
  };
  const handleSave = () => {
    dispatch({
      type: ActionKind.UPDATE_NAME,
      payload: {
        name: scriptName,
      },
    });
    script.name = scriptName;
    addScript({
      name: scriptName,
      road: script.road,
    });
  };

  const handleDeleteBlock = (uid: string) => {
    dispatch({
      type: ActionKind.REMOVE_BLOCK,
      payload: {
        uid: uid,
      },
    });
  };

  const handleMoveBlock = (direction: "up" | "down", index: number) => {
    switch (direction) {
      case "up":
        dispatch({
          type: ActionKind.MOVE_BLOCK,
          payload: {
            positon: index,
            newPosition: index - 1,
          },
        });
        break;
      case "down":
        dispatch({
          type: ActionKind.MOVE_BLOCK,
          payload: {
            positon: index,
            newPosition: index + 1,
          },
        });
        break;
    }
  };

  const scriptSelect = useRef<HTMLSelectElement>(null);

  const handleRunScript = () => {
    dispatch({
      type: ActionKind.RUN_SCRIPT,
      payload: undefined,
    });
  };

  const handleUseScript = () => {
    const [newLoadedScript] = scripts.filter(
      (el) => el.name == scriptSelect.current?.value
    );
    const parsedScript = addActionToScript(newLoadedScript);
    dispatch({
      type: ActionKind.SET_SCRIPT,
      payload: parsedScript,
    });
  };
  return (
    <>
      <Modal onConfirm={handleBlockAdd} />
      <Heading>Create your script</Heading>
      <Flex gap={5}>
        <Select onChange={handleUseScript} ref={scriptSelect} w={250}>
          {scripts.map((el, index) => {
            return <option key={index}>{el.name}</option>;
          })}
        </Select>
      </Flex>
      <Input
        value={scriptName}
        onChange={(e) => setScriptName(e.target.value)}
        w={240}
        type="text"
        placeholder="nom du script"
      />
      <Flex gap={3}>
        <Button onClick={onOpen}>Add Block</Button>
        <Button onClick={handleRunScript} colorScheme="blue">
          Run
        </Button>
        {scriptName.length > 2 && (
          <Button onClick={handleSave}>Save Script</Button>
        )}
      </Flex>

      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <AnimatePresence>
          {script.road.map((el, index) => {
            return (
              <Flex
                key={el.uid}
                justifyContent={"center"}
                alignItems={"center"}
                direction={"column"}
              >
                <BlockCard
                  uid={el.uid}
                  onMove={(direction) => handleMoveBlock(direction, index)}
                  isTop={index == 0 ? true : false}
                  isDown={index == script.road.length - 1 ? true : false}
                  onDelete={() => handleDeleteBlock(el.uid)}
                  distance={el.distance}
                  name={el.name}
                />
                {script.road.length != index + 1 && (
                  <Flex alignItems={"center"}>
                    <div
                      style={{
                        height: 50,
                        width: 2,
                        background: "black",
                      }}
                    ></div>

                    <Text position={"absolute"} transform={"translateX(10px)"}>
                      {el.time}ms
                    </Text>
                  </Flex>
                )}
              </Flex>
            );
          })}
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default Script;
