import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { BlockName } from "../../../types/ScriptTypes/Block.types";
import Zoom from "../anim/Zoom";

type Props = {
  uid: string;
  name: BlockName;
  distance: number;
  isTop: boolean;
  isDown: boolean;
  onMove: (direction: "up" | "down") => void;
  onDelete: () => void;
};

const BlockCard = ({
  uid,
  name,
  onDelete,
  distance,
  isTop,
  isDown,
  onMove,
}: Props) => {
  const renderDistance =
    ![BlockName.Demarrer, BlockName.Arreter].includes(name) &&
    `: ${distance} cm`;
  return (
    <Zoom id={uid}>
      <Flex>
        <Card w={300}>
          <CardBody>
            <Heading fontSize={24}>
              {name.toUpperCase()}
              {renderDistance}
            </Heading>
            <Divider />
          </CardBody>
          <CardFooter gap={4}>
            <Flex
              w="full"
              justifyContent={"center"}
              gap={2}
              direction={"column"}
            >
              {!isTop && (
                <IconButton
                  onClick={() => onMove("up")}
                  icon={<ArrowUpIcon />}
                  aria-label="up"
                />
              )}
              {!isDown && (
                <IconButton
                  onClick={() => onMove("down")}
                  icon={<ArrowDownIcon />}
                  aria-label="down"
                />
              )}
            </Flex>
            <IconButton
              minH={"40px"}
              height={"full"}
              onClick={onDelete}
              aria-label="been"
              icon={<DeleteIcon />}
              colorScheme="red"
            />
          </CardFooter>
        </Card>
      </Flex>
    </Zoom>
  );
};

export default BlockCard;
