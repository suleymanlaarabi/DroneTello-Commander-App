import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useReducer, useRef, useState } from "react";
import scriptCreationReducer, {
  ActionKind,
} from "../../../hooks/reducer/scriptCreation/scriptCreationReducer";
import { CreateBlockModal } from "../../common/Modal/CreateBlockModal";
import useModal from "../../../hooks/useModal";
import { Block, BlockName } from "../../../types/ScriptTypes/Block.types";
import {
  addActionToScript,
  runScript,
} from "../../../hooks/reducer/scriptCreation/function";
import { useScript } from "../../../hooks/useScript";
import { AnimatePresence, Reorder } from "framer-motion";
import BlockCardList from "./BlockCardList";
const Script = () => {
  const isPhone = window.innerWidth <= 550;
  const { scripts, addScript, removeScript } = useScript();

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

  const [blockInExecution, setBlockInExecution] = useState("");

  const scriptSelect = useRef<HTMLSelectElement>(null);

  const handleRunScript = () => {
    runScript(script, (uid: string) => {
      setBlockInExecution(uid);
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

  const handleReOrder = (road: Block[]) => {
    dispatch({
      type: ActionKind.SET_SCRIPT,
      payload: {
        name: script.name,
        road: road,
      },
    });
  };

  const handleDeleteScript = () => {
    dispatch({
      type: ActionKind.SET_SCRIPT,
      payload: {
        name: "Choissisez un script",
        road: [],
      },
    });
    removeScript(script);
  };

  return (
    <>
      <Modal onConfirm={handleBlockAdd} />
      <Heading>Create your script</Heading>
      {blockInExecution == "" && (
        <>
          <Flex gap={5}>
            <Select onChange={handleUseScript} ref={scriptSelect} w={250}>
              {scripts.map((el, index) => {
                return <option key={index}>{el.name}</option>;
              })}
            </Select>
            <IconButton
              onClick={handleDeleteScript}
              aria-label="delete"
              icon={<DeleteIcon />}
            />
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
        </>
      )}

      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        {isPhone ? (
          <BlockCardList
            isPhone={true}
            road={script.road}
            handleDeleteBlock={handleDeleteBlock}
            handleMoveBlock={handleMoveBlock}
            blockInExecution={blockInExecution}
          />
        ) : (
          <AnimatePresence>
            <Reorder.Group
              axis="y"
              values={script.road}
              onReorder={handleReOrder}
            >
              <BlockCardList
                road={script.road}
                handleDeleteBlock={handleDeleteBlock}
                handleMoveBlock={handleMoveBlock}
                blockInExecution={blockInExecution}
              />
            </Reorder.Group>
          </AnimatePresence>
        )}
      </Flex>
    </>
  );
};

export default Script;
