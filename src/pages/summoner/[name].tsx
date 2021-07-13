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
import { Mastery as MasteryItem } from "../../components/Mastery";

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

          {rank.length >= 2 ? (
            <>
              <Tier unformattedRank={rank[0]} />
              <Tier unformattedRank={rank[1]} />
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
  const matches = (await dataMatches).response.matches.slice(0, 2);

  const dataRank = getLeagueEntriesBySummonerID(summonerByName.id);
  const rank = (await dataRank).response;

  const dataMasteries = getChampionsMasteryBySummoner(summonerByName.id);
  const masteries = (await dataMasteries).response;

  const dataMatch = getMatchByGameId(matches[1].gameId);
  const matchInfos = (await dataMatch).response;

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
