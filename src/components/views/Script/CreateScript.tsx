import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useReducer, useState } from "react";
import scriptCreationReducer from "../../../hooks/reducer/scriptCreation/scriptCreationReducer";
import { CreateBlockModal } from "../../common/Modal/CreateBlockModal";
import useModal from "../../../hooks/useModal";
import { BlockName } from "../../../types/ScriptTypes/Block.types";
const CreateScript = () => {
  const [script, dispatch] = useReducer(scriptCreationReducer, {
    name: "No Name",
    road: [],
  });
  console.log(dispatch);
  const [scriptName, setScriptName] = useState("");
  const { Modal, onOpen } = useModal(CreateBlockModal);
  const handleBlockAdd = (name: BlockName) => {
    dispatch({
      type: "UPDATE_NAME",
      payload: {
        name: scriptName,
      },
    });
    dispatch({
      type: "ADD_BLOCK",
      payload: {
        name: name,
      },
    });
  };
  const handleSave = () => {
    const oldScripts = localStorage.getItem("script");
    console.log(script, oldScripts);
    if (oldScripts) {
      localStorage.setItem(
        "script",
        JSON.stringify([...JSON.parse(oldScripts), script])
      );
      return;
    }
    localStorage.setItem("script", JSON.stringify([script]));
  };
  return (
    <>
      <Modal onConfirm={handleBlockAdd} />
      <Heading>Create your script</Heading>
      <Input
        value={scriptName}
        onChange={(e) => setScriptName(e.target.value)}
        w={240}
        type="text"
        placeholder="nom du script"
      />
      <Flex gap={3}>
        <Button onClick={onOpen}>Add Block</Button>
        {scriptName.length > 2 && (
          <Button onClick={handleSave}>Save Script</Button>
        )}
      </Flex>

      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        {script.road.map((el, index) => {
          return (
            <Flex
              key={el.uid}
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
            >
              {index !== 0 && (
                <div
                  style={{
                    height: 30,
                    width: 2,
                    background: "black",
                  }}
                ></div>
              )}
              <Heading>{el.name}</Heading>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};

export default CreateScript;
