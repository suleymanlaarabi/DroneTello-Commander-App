export type BlockResult = {
  isError: boolean;
  result: string;
};

export enum BlockName {
  Avancer = "avancer",
  Reculer = "reculer",
  Droite = "droite",
  Gauche = "gauche",
}

export type Block = {
  uid?: string;
  name: BlockName;
  time?: number;
  action?: () => BlockResult;
};