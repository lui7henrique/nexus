export type SummonerByName = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};

export type SummonerType = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  icon: number;
  level: number;
};

export type MatchType = {
  platformId: string;
  gameId: number;
  champion: number;
  queue: number;
  season: number;
  timestamp: number;
  role: string;
  lane: string;
};

export type Mastery = {
  championId: number;
  championLevel: number;
  championPoints: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  lastPlayTime: number;
  summonerId: string;
  tokensEarned: 0;
};
