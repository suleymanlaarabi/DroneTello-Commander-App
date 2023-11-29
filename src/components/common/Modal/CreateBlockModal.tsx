import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Select,
} from "@chakra-ui/react";
import { BlockName } from "../../../types/ScriptTypes/Block.types";
import { useRef } from "react";

interface CreateBlockModalProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: BlockName) => void;
}

export function CreateBlockModal({
  isOpen,
  onClose,
  onConfirm,
}: CreateBlockModalProps) {
  const handleSave = () => {
    if (selectRef.current) {
      onConfirm(selectRef.current.value as BlockName);
    }
    onClose();
  };
  const selectRef = useRef<HTMLSelectElement>(null);
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Select ref={selectRef} placeholder="Select action">
              <option value={BlockName.Avancer}>Avancer</option>
              <option value={BlockName.Reculer}>Reculer</option>
              <option value={BlockName.Droite}>Droite</option>
              <option value={BlockName.Gauche}>Gauche</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSave} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
