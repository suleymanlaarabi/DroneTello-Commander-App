import { Flex, Text } from "@chakra-ui/react";
import { Block } from "../../../types/ScriptTypes/Block.types";
import { Reorder } from "framer-motion";
import BlockCard from "../../common/Card/BlockCard";
type props = {
  isPhone?: boolean;
  road: Block[];
  blockInExecution: string;
  handleMoveBlock: (direction: "up" | "down", index: number) => void;
  handleDeleteBlock: (uid: string) => void;
};
const BlockCardList = ({
  road,
  blockInExecution,
  handleDeleteBlock,
  handleMoveBlock,
  isPhone,
}: props) => {
  return road.map((el, index) => {
    return (
      <Flex
        key={el.uid}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        {isPhone ? (
          <BlockCard
            isInExecution={el.uid == blockInExecution}
            uid={el.uid}
            onMove={(direction) => handleMoveBlock(direction, index)}
            isTop={index == 0 ? true : false}
            isDown={index == road.length - 1 ? true : false}
            onDelete={() => handleDeleteBlock(el.uid)}
            distance={el.distance}
            name={el.name}
          />
        ) : (
          <Reorder.Item
            whileDrag={{
              cursor: "grabbing",
            }}
            style={{
              listStyle: "none",
              cursor: "grab",
            }}
            key={el.uid}
            value={el}
          >
            <BlockCard
              isInExecution={el.uid == blockInExecution}
              uid={el.uid}
              onMove={(direction) => handleMoveBlock(direction, index)}
              isTop={index == 0 ? true : false}
              isDown={index == road.length - 1 ? true : false}
              onDelete={() => handleDeleteBlock(el.uid)}
              distance={el.distance}
              name={el.name}
            />
          </Reorder.Item>
        )}

        {road.length != index + 1 && (
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
  });
};

export default BlockCardList;
