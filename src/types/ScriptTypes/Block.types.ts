export type BlockResult = {
  isError: boolean;
  result: string;
};

export enum BlockName {
  Avancer = "avancer",
  Reculer = "reculer",
  Droite = "droite",
  Gauche = "gauche",
  Haut = "haut",
  Bas = "bas",
  Arreter = "arreter",
  Demarrer = "demarrer",
  Emergency = "emergency",
}

export type Block = {
  uid: string;
  name: BlockName;
  time: number;
  distance: number;
  action: (distance: number | undefined) => Promise<BlockResult>;
};
