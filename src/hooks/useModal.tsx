import { useDisclosure } from "@chakra-ui/react";
import { CreateBlockModalProps } from "../types/ModalTypes";

type ModalProps = CreateBlockModalProps;

const useModal = (ChildModal: React.ElementType) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const Modal = (props: ModalProps) => {
    return <ChildModal {...props} isOpen={isOpen} onClose={onClose} />;
  };
  return { Modal, onOpen };
};

export default useModal;
