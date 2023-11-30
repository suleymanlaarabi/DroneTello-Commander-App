import {
  Button,
  Divider,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { BlockName } from "../../../types/ScriptTypes/Block.types";
import { useState } from "react";
import { CreateBlockActionTypes } from "../../../types/ModalTypes";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface CreateBlockModalProps extends CreateBlockActionTypes {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateBlockModal({
  isOpen,
  onClose,
  onConfirm,
}: CreateBlockModalProps) {
  const handleSave = () => {
    onConfirm(select, time, distance);
    onClose();
  };
  const [showTooltip, setShowTooltip] = useState(false);
  const [time, setTime] = useState(0);

  const [distance, setDistance] = useState(20);

  const [select, setSelect] = useState<BlockName>(BlockName.Demarrer);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Block</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex>
              {[BlockName.Demarrer, BlockName.Arreter].includes(select) ? (
                <Select
                  onChange={(e) => setSelect(e.target.value as BlockName)}
                  value={select}
                  placeholder="Select action"
                >
                  <option value={BlockName.Demarrer}>Demarrer</option>
                  <option value={BlockName.Arreter}>Arreter</option>
                  <option value={BlockName.Avancer}>Avancer</option>
                  <option value={BlockName.Reculer}>Reculer</option>
                  <option value={BlockName.Droite}>Droite</option>
                  <option value={BlockName.Gauche}>Gauche</option>
                </Select>
              ) : (
                <Flex gap={3} direction={"column"} w={"100%"}>
                  <Flex alignItems={"center"} gap={4}>
                    <IconButton
                      w="45px"
                      h="45px"
                      icon={<ArrowBackIcon />}
                      aria-label="back"
                      onClick={() => setSelect(BlockName.Demarrer)}
                    />
                    <Text>Distance: {distance}cm</Text>
                  </Flex>
                  <Slider
                    min={20}
                    max={500}
                    step={10}
                    value={distance}
                    onChange={(e) => setDistance(e)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>

                    <SliderThumb />
                  </Slider>
                </Flex>
              )}
            </Flex>

            <Divider my={5} />
            <Text>Time before second action: {time}ms</Text>
            <Slider
              min={0}
              max={5000}
              step={100}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              value={time}
              onChange={(e) => setTime(e)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="blue.500"
                color="white"
                placement="top"
                isOpen={showTooltip}
                label={`${time}ms`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSave} colorScheme="blue" mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
