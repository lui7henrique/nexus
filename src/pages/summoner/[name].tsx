/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, GetStaticPaths } from "next";
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
import { winRate } from "../../utils/winrate";
import { aroundNumber } from "../../utils/aroundNumber";
import Link from "next/link";
import { Tier } from "../../components/Tier";

export default function SummonerPage(summonerByName: any) {
  const summoner: Summoner = summonerByName.summonerByName;
  const matches: MatchType[] = summonerByName.matches;
  const masteries: Mastery[] = summonerByName.masteries.slice(0, 9);
  const matchInfos: MatchInfos = summonerByName.matchInfos;
  const rank: Rank[] = summonerByName.rank;

  return (
    <div className={styles.container}>
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

          <Tier unformattedRank={rank[1]} />
          <Tier unformattedRank={rank[0]} />

          <ul className={styles.mastries}>
            {masteries.map((mastery) => {
              return (
                <div className={styles.mastery} key={mastery.championId}>
                  <img
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${mastery.championId}.png`}
                    alt="Maestry champion icon"
                    className={styles.iconMastery}
                  />
                  <img
                    src={`https://lolg-cdn.porofessor.gg/img/masteries/lvl${mastery.championLevel}.png`}
                    alt={`Maestria nível ${mastery.championLevel}`}
                    className={styles.masteryLevel}
                  />
                  <div>
                    <p>{mastery.championPoints}</p>
                    <span></span>
                    {mastery.chestGranted && (
                      <img
                        src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-collections/global/default/images/item-element/hextech-chest.png"
                        alt="Chest"
                        className={styles.chest}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </ul>
        </section>

        <aside>
          {matches.map((match) => {
            return (
              <div key={match.gameId}>
                <img
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${match.champion}.png`}
                  alt=""
                  className={styles.principalChampion}
                />
                <section className={styles.teams}>
                  <ul>
                    {matchInfos.participants
                      .slice(0, 5)
                      .map((participant, index) => {
                        return (
                          <li
                            key={participant.championId}
                            className={styles.team1_player}
                          >
                            <img
                              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${participant.championId}.png`}
                              alt=""
                            />
                            <Link
                              href={`/summoner/${
                                matchInfos.participantIdentities[5 + index]
                                  .player.summonerName
                              }`}
                            >
                              <a>
                                <p>
                                  {
                                    matchInfos.participantIdentities[index]
                                      .player.summonerName
                                  }
                                </p>
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>

                  <ul>
                    {matchInfos.participants
                      .slice(5, 10)
                      .map((participant, index) => {
                        return (
                          <li
                            key={participant.championId}
                            className={styles.team2_player}
                          >
                            <img
                              key={participant.championId}
                              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${participant.championId}.png`}
                              alt=""
                            />
                            <Link
                              href={`/summoner/${
                                matchInfos.participantIdentities[5 + index]
                                  .player.summonerName
                              }`}
                            >
                              <a>
                                <p>
                                  {
                                    matchInfos.participantIdentities[5 + index]
                                      .player.summonerName
                                  }
                                </p>
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </section>
              </div>
            );
          })}
        </aside>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const nick = ctx.query.name;
  const dataSummoner = getSummonerByName(nick as string);
  const summonerByName: Summoner = (await dataSummoner).response;

  const dataMatches = getMatchesByEncryptedAccountId(summonerByName.accountId);
  const matches = (await dataMatches).response.matches.slice(0, 9);

  const dataMasteries = getChampionsMasteryBySummoner(summonerByName.id);
  const masteries = (await dataMasteries).response;

  const dataMatch = getMatchByGameId(matches[1].gameId);
  const matchInfos = (await dataMatch).response;

  const dataRank = getLeagueEntriesBySummonerID(summonerByName.id);
  const rank = (await dataRank).response;

  return {
    props: {
      summonerByName,
      matches,
      masteries,
      matchInfos,
      rank,
    },
  };
};
