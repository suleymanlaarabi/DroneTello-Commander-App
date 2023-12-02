import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useBlock } from "../../../hooks/useBlock";
import CustomBlockCard from "../Card/CustomBlockCard";
import { useState } from "react";
import Zoom from "../anim/Zoom";
import { PayloadAddCustomBlock } from "../../../hooks/reducer/scriptCreation/scriptCreationReducer";
import { Block } from "../../../types/ScriptTypes/Block.types";

type props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (block: PayloadAddCustomBlock) => void;
};

export function CustomBlockDrawer({ isOpen, onClose, onSave }: props) {
  const { blocks } = useBlock();
  const [blockSelected, setBlockSelected] = useState("");

  const handleSave = () => {
    const block = blocks.filter((el) => el.uid == blockSelected)[0] as Block;
    onSave({
      name: block.name,
      customCode: block.customCode as string,
      time: time,
    });
  };

  const [time, setTime] = useState(0);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Flex direction={"column"} gap={5}>
              <Text>Time before second action : {time}ms</Text>
              <Slider
                aria-label="slider-ex-3"
                step={10}
                min={0}
                max={5000}
                value={time}
                onChange={(e) => setTime(e)}
                colorScheme="blue"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb bg={"blue"}>
                  <Box />
                </SliderThumb>
              </Slider>
              {blocks.map((el) =>
                blockSelected == el.uid ? (
                  <Zoom key={el.uid} id={el.uid}>
                    <Box
                      borderRadius={10}
                      padding={4}
                      border={"solid 3px black"}
                    >
                      <CustomBlockCard
                        uid={el.uid}
                        name={el.name}
                        onClick={() => setBlockSelected(el.uid)}
                      />
                    </Box>
                  </Zoom>
                ) : (
                  <CustomBlockCard
                    key={el.uid}
                    uid={el.uid}
                    name={el.name}
                    onClick={() => setBlockSelected(el.uid)}
                  />
                )
              )}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
