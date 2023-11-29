import { BlockName } from "./ScriptTypes/Block.types";

export type CreateBlockModalProps = {
  onConfirm: (name: BlockName) => void;
};
