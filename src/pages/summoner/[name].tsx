/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, GetStaticPaths } from "next";
import { Header } from "../../components/Header";
import {
  getChampionsMasteryBySummoner,
  getMatchesByEncryptedAccountId,
  getSummonerByName,
} from "../api/matches";
import styles from "./styles.module.scss";
import { SummonerByName, MatchType, Mastery } from "../../types/summoner";

export default function Summoner(summonerByName: any) {
  const summoner: SummonerByName = summonerByName.summonerByName;
  const matches: MatchType[] = summonerByName.matches;
  const masteries: Mastery[] = summonerByName.masteries.slice(0, 9);
  console.log(masteries);

  return (
    <div className={styles.container}>
      <Header />

      <main>
        <section className={styles.summoner}>
          <div className={styles.avatar}>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.14.1/img/profileicon/${summoner.profileIconId}.png`}
              alt={`${summoner.name} icon`}
            />
            <div>
              <p>{summoner.summonerLevel}</p>
            </div>
          </div>

          <h1>{summoner.name}</h1>

          <ul className={styles.mastries}>
            {masteries.map((mastery) => {
              return (
                <div className={styles.mastery} key={mastery.championId}>
                  <img
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${mastery.championId}.png`}
                    alt=""
                  />
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
                />
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
  const summonerByName: SummonerByName = (await dataSummoner).response;

  const dataMatches = getMatchesByEncryptedAccountId(summonerByName.accountId);
  const matches = (await dataMatches).response.matches;

  const dataMasteries = getChampionsMasteryBySummoner(summonerByName.id);
  const masteries = (await dataMasteries).response;

  return {
    props: {
      summonerByName,
      matches,
      masteries,
    },
  };
};
