import { BlockResult } from "../types/ScriptTypes/Block.types";

export async function get(url: string) {
  const res = await fetch(url);
  return (await res.json()) as BlockResult;
}
