import { LolApi, Constants } from "twisted";

const api = new LolApi();

export async function getSummonerByName(nickname: string) {
  return await api.Summoner.getByName(nickname, Constants.Regions.BRAZIL);
}

export async function getMatchesByEncryptedAccountId(
  encryptedAccountId: string
) {
  return await api.Match.list(encryptedAccountId, Constants.Regions.BRAZIL);
}

export async function getChampionsMasteryBySummoner(id: string) {
  return await api.Champion.masteryBySummoner(id, Constants.Regions.BRAZIL);
}

export async function getMatchByGameId(gameId: number) {
  return api.Match.get(gameId, Constants.Regions.BRAZIL);
}

export async function getLeagueEntriesBySummonerID(id: string) {
  return api.League.bySummoner(id, Constants.Regions.BRAZIL);
}
