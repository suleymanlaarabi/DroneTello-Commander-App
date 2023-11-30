import { BlockName } from "./ScriptTypes/Block.types";

export type CreateBlockActionTypes = {
  onConfirm: (name: BlockName, time: number, distance: number) => void;
};
