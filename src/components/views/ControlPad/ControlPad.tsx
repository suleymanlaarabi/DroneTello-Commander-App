import {
  Box,
  Button,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { useState } from "react";
import { BlockName, BlockResult } from "../../../types/ScriptTypes/Block.types";
import { handleMoveTello } from "../../../utils/tello";

export type LaunchActionType = (
  action: (distance: number | undefined) => Promise<BlockResult>
) => Promise<void>;

const ControlPad = () => {
  const [speed, setSpeed] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const launchAction = async (
    action: (distance: number | undefined) => Promise<BlockResult>
  ) => {
    setIsLoading(true);
    action(speed).then(() => {
      setIsLoading(false);
    });
  };

  const handleMove = (name: BlockName) => {
    handleMoveTello(name, launchAction);
  };
  return (
    <>
      <Heading>Drone Tello</Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Flex gap={5}>
            <Button onClick={() => handleMove(BlockName.Demarrer)}>
              Démarrer
            </Button>
            <Button onClick={() => handleMove(BlockName.Arreter)}>
              Arreter
            </Button>
            <Button onClick={() => handleMove(BlockName.Emergency)}>
              Abort
            </Button>
          </Flex>
          <Text fontSize={25} align={"center"} minW={"70px"} w={"full"}>
            Distance: {speed} cm
          </Text>
          <Flex gap={5}>
            <Flex gap={10} direction={"column"}>
              <Button onClick={() => handleMove(BlockName.Avancer)}>
                Avancer
              </Button>
              <Flex gap={2}>
                <Button onClick={() => handleMove(BlockName.Droite)}>
                  droite
                </Button>
                <Button onClick={() => handleMove(BlockName.Gauche)}>
                  Gauche
                </Button>
              </Flex>
              <Button onClick={() => handleMove(BlockName.Reculer)}>
                reculer
              </Button>
            </Flex>

            <Flex gap={5} flexDirection={"column"}>
              <Button h={"100%"} onClick={() => handleMove(BlockName.Haut)}>
                Haut
              </Button>
              <Button h={"100%"} onClick={() => handleMove(BlockName.Bas)}>
                Bas
              </Button>
            </Flex>

            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Slider
                aria-label="slider-ex-3"
                value={speed}
                onChange={(e) => setSpeed(e)}
                step={10}
                min={20}
                max={200}
                orientation="vertical"
                minH="32"
                colorScheme="blue"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb bg={"blue"}>
                  <Box />
                </SliderThumb>
              </Slider>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default ControlPad;
