export type Summoner = {
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

export type ParticipantIdentity = {
  accountId: string;
  currentAccountId: string;
  currentPlatformId: string;
  matchHistoryUri: string;
  platformId: string;
  profileIcon: number;
  summonerId: string;
  summonerName: string;
};

export type MatchInfos = {
  gameCreation: number;
  gameDuration: number;
  gameId: number;
  gameMode: string;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participantIdentities: {
    participantId: number;
    player: ParticipantIdentity;
  }[];
  participants: {
    championId: number;
    participantId: number;
    spell1Id: number;
    spell2Id: number;
    stats: Stats;
  }[];
  platformId: string;
  queueId: number;
  remake: boolean;
  seasonId: number;
  teams: any;
};

export type Stats = {
  assists: 11;
  champLevel: 15;
  damageDealtToObjectives: 3474;
  damageDealtToTurrets: 3246;
  damageSelfMitigated: 9957;
  deaths: 8;
  firstBloodKill: false;
  goldEarned: 12133;
  item0: 1056;
  item1: 3157;
  item2: 3020;
  item3: 6655;
  item4: 3165;
  item5: 0;
  item6: 3340;
  kills: 6;
  totalMinionsKilled: 73;
  tripleKills: 0;
  wardsPlaced: 5;
  win: true;
};

export type Rank = {
  freshBlood: boolean;
  hotStreak: boolean;
  inactive: boolean;
  leagueId: string;
  leaguePoints: number;
  losses: number;
  queueType: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  tier: string;
  veteran: boolean;
  wins: number;
};
