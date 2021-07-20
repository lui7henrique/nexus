/* eslint-disable @next/next/no-img-element */
import { MatchInfos } from "../../types/summoner";
import styles from "./styles.module.scss";
import { TimestampConverter } from "../../utils/timestampConverter";
import { useRouter } from "next/router";
import "./styles.module.scss";
import styled from "styled-components";
import { Item } from "../Item";

type MatchType = {
  match: MatchInfos;
  champion: number;
};

export function Match({ champion, match }: MatchType) {
  const { query } = useRouter();
  const principalPlayerName = query.name;

  const principalPlayerIdentity = match.participantIdentities.filter(
    (participantIdentity) =>
      participantIdentity.player.summonerName === principalPlayerName
  );

  const { participantId } = principalPlayerIdentity[0];

  const principalPlayerInformations = match.participants.filter(
    (participant) => participant.participantId === participantId
  );

  const principalPlayer = principalPlayerInformations[0];

  return (
    <div
      className={`${styles.match} ${
        principalPlayer.stats.win === true ? styles.win : styles.defeat
      }`}
    >
      <div>
        <img
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion}.png`}
          alt=""
          className={styles.principalChampion}
        />
        <div>
          <p>{match.gameMode}</p>
          <p>{TimestampConverter(match.gameCreation)}</p>
        </div>
      </div>

      <main>
        <div className={styles.items}>
          <Item icon={principalPlayer.stats.item0} />
          <Item icon={principalPlayer.stats.item1} />
          <Item icon={principalPlayer.stats.item2} />
          <Item icon={principalPlayer.stats.item3} />
          <Item icon={principalPlayer.stats.item4} />
          <Item icon={principalPlayer.stats.item5} />
          <Item icon={principalPlayer.stats.item6} />
        </div>
        <div>
          <p>
            {principalPlayer.stats.kills} / {principalPlayer.stats.deaths} /{" "}
            {principalPlayer.stats.assists}
          </p>
        </div>
      </main>

      <div className={styles.teams}>
        <div className={styles.team1}>
          {match.participants.slice(0, 5).map((partcipant, index) => {
            return (
              <div
                key={partcipant.participantId}
                className={
                  match.participantIdentities[index].player.summonerName ===
                  principalPlayerName
                    ? styles.principalPlayer
                    : ""
                }
              >
                <img
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${partcipant.championId}.png`}
                  alt=""
                />
                <p>{match.participantIdentities[index].player.summonerName}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.team2}>
          {match.participants.slice(5, 10).map((partcipant, index) => {
            return (
              <div
                key={partcipant.participantId}
                className={
                  match.participantIdentities[5 + index].player.summonerName ===
                  principalPlayerName
                    ? styles.principalPlayer
                    : ""
                }
              >
                <img
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${partcipant.championId}.png`}
                  alt=""
                />
                <p>
                  {match.participantIdentities[5 + index].player.summonerName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
