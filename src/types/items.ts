export type ItemType = {
  colloq: string;
  description: string;
  gold: {
    base: 300;
    purchasable: true;
    sell: 210;
    total: 300;
  };
  image: {
    full: string;
    group: string;
    h: number;
    sprite: string;
    w: number;
    x: number;
    y: number;
  };
  name: string;
  plaintext: string;
  tags: string[];
};
