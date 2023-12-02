import { Block } from "../types/ScriptTypes/Block.types";
import { useLocalStorage } from "@uidotdev/usehooks";

export function useBlock() {
  const [blocks, setBlocks] = useLocalStorage<Block[]>("blocks", []);

  const addBlock = (block: Block) => {
    const newBlocks = blocks.filter((el) => el.name != block.name);
    setBlocks([...newBlocks, block]);
  };

  return {
    blocks,
    addBlock,
  };
}
