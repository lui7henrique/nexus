/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import { Header } from "../../components/Header";
import {
  getChampionsMasteryBySummoner,
  getLeagueEntriesBySummonerID,
  getMatchByGameId,
  getMatchesByEncryptedAccountId,
  getSummonerByName,
} from "../api/matches";
import styles from "./styles.module.scss";
import {
  Summoner,
  MatchType,
  Mastery,
  MatchInfos,
  Rank,
} from "../../types/summoner";
import { Tier } from "../../components/Tier";
import { Mastery as MasteryItem } from "../../components/Mastery";
import { Match } from "../../components/Match";

export default function SummonerPage(summonerByName: any) {
  const summoner: Summoner = summonerByName.summonerByName;
  const matches: MatchType[] = summonerByName.matches.slice(0, 10);
  const masteries: Mastery[] = summonerByName.masteries.slice(0, 9);
  const rank: Rank[] = summonerByName.rank;
  const matchesInfos: MatchInfos[] = summonerByName.matchesInfos;

  return (
    <div className={styles.container}>
      <title>Nexus | {summoner.name}</title>
      <Header />

      <main>
        <section className={styles.summoner}>
          <div className={styles.avatar}>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.14.1/img/profileicon/${summoner.profileIconId}.png`}
              alt={`${summoner.name} icon`}
              className={styles.icon}
            />
            <div>
              <p>{summoner.summonerLevel}</p>
            </div>
          </div>
          <h1>{summoner.name} </h1>

          {rank.length >= 2 ? (
            <>
              <Tier unformattedRank={rank[1]} />
              <Tier unformattedRank={rank[0]} />
            </>
          ) : (
            <Tier unformattedRank={rank[0]} />
          )}

          <div className={styles.mastries}>
            {masteries.map((mastery) => {
              return <MasteryItem key={mastery.championId} mastery={mastery} />;
            })}
          </div>
        </section>

        <aside>
          {matches.map((match, index) => {
            return (
              <Match
                key={match.gameId}
                champion={match.champion}
                match={matchesInfos[index]}
              />
            );
          })}
        </aside>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const nick = ctx.query.name;

  // informações do invocador
  const dataSummoner = getSummonerByName(nick as string);
  const summonerByName: Summoner = (await dataSummoner).response;

  // elo do invocaodr
  const dataRank = getLeagueEntriesBySummonerID(summonerByName.id);
  const rank = (await dataRank).response;

  // maestrias do invocaodr
  const dataMasteries = getChampionsMasteryBySummoner(summonerByName.id);
  const masteries = (await dataMasteries).response;

  // partidas recentes do invocador
  const dataMatches = getMatchesByEncryptedAccountId(summonerByName.accountId);
  const matches = (await dataMatches).response.matches;

  const matchesInfos = await Promise.all(
    matches.slice(0, 10).map(async (match) => {
      const res = await getMatchByGameId(match.gameId);
      return res.response;
    })
  );

  return {
    props: {
      summonerByName,
      matches,
      masteries,
      rank,
      matchesInfos,
    },
  };
};
