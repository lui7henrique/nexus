export type ChampionInfos = {
  name: string;
  id: string;
  title: string;
  image: {
    full: string;
    sprite: string;
  };
  skins: Skin[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
  spells: [
    {
      id: string;
      name: string;
      description: string;
      image: {
        full: string;
        sprite: string;
      };
    }
  ];
  passive: {
    name: string;
    description: string;
    image: {
      full: string;
      sprite: string;
    };
  };
};

export type ChampionFull = {
  champion: ChampionInfos;
};

type Skin = {
  chromas: boolean;
  id: string;
  name: string;
  num: number;
};
