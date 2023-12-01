import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import { BlockName, BlockResult } from "../../../types/ScriptTypes/Block.types";
import Zoom from "../anim/Zoom";
import { memo, useState } from "react";
import { handleMoveTello } from "../../../utils/tello";

type Props = {
  isInExecution: boolean;
  uid: string;
  name: BlockName;
  distance: number;
  isTop: boolean;
  isDown: boolean;
  onMove: (direction: "up" | "down") => void;
  onDelete: () => void;
};

const BlockCard = memo(
  ({
    uid,
    name,
    onDelete,
    distance,
    isTop,
    isDown,
    onMove,
    isInExecution,
  }: Props) => {
    const renderDistance =
      ![BlockName.Demarrer, BlockName.Arreter].includes(name) &&
      `: ${distance} cm`;
    const styleInExecution = isInExecution
      ? {
          border: "solid 2px black",
          transform: "scale(1.1)",
        }
      : {};
    const [isLoading, setIsLoading] = useState(false);

    const launchAction = async (
      action: (distance: number | undefined) => Promise<BlockResult>
    ) => {
      setIsLoading(true);
      action(distance).then(() => {
        setIsLoading(false);
      });
    };

    const handleRunCommand = () => {
      handleMoveTello(name, launchAction);
    };
    return (
      <Zoom id={uid}>
        <Flex borderRadius={5} transition={".3s"} style={styleInExecution}>
          <Card w={300}>
            <CardBody>
              <Flex
                height={"60px"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Heading fontSize={24}>
                  {name.toUpperCase()}
                  {renderDistance}
                </Heading>
                <Tooltip
                  hasArrow
                  label="Run command"
                  bg="gray.300"
                  color="black"
                >
                  <IconButton
                    onClick={handleRunCommand}
                    h={"40px"}
                    w={"40px"}
                    aria-label="save"
                    icon={isLoading ? <Spinner /> : <CheckIcon />}
                    isDisabled={isLoading}
                  />
                </Tooltip>
              </Flex>

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
  }
);

export default BlockCard;
