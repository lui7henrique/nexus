/* eslint-disable @next/next/no-img-element */
import { MatchInfos } from "../../types/summoner";
import styles from "./styles.module.scss";
import { TimestampConverter } from "../../utils/timestampConverter";
import { FormatSpell } from "../../utils/formatSpell";
import { FormatQueueId } from "../../utils/formatQueueId";
import { FormatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import { useRouter } from "next/router";
import { Item } from "../Item";
import "./styles.module.scss";

type MatchType = {
  match: MatchInfos;
  champion: number;
};

export function Match({ champion, match }: MatchType) {
  const { query } = useRouter();
  const principalPlayerName = query.name;

  const principalPlayerIdentity = match.participantIdentities.filter(
    (participantIdentity) =>
      participantIdentity.player.summonerName.toLowerCase() ===
      principalPlayerName
  );

  const { participantId } = principalPlayerIdentity[0];

  const principalPlayerInformations = match.participants.filter(
    (participant) => participant.participantId === participantId
  );

  const principalPlayer = principalPlayerInformations[0];
  console.log(match);

  return (
    <div
      className={`${styles.match} ${
        principalPlayer.stats.win ? styles.win : styles.defeat
      }`}
    >
      <div>
        <div>
          <div className={styles.level_role}>
            <p></p>
            <img
              src={
                principalPlayer.timeline.lane !== "NONE"
                  ? `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${principalPlayer.timeline.lane.toLowerCase()}.svg`
                  : "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/info-icon.svg"
              }
              alt={principalPlayer.timeline.lane}
            />
          </div>
          <img
            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion}.png`}
            alt=""
            className={styles.principalChampion}
          />
        </div>
        <div className={styles.details}>
          <h1>{FormatQueueId(match.queueId)} </h1>
          <h2>
            {FormatSecondsToMinutes(match.gameDuration)} •{" "}
            {TimestampConverter(match.gameCreation)}
          </h2>
          <div>
            <img
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner${FormatSpell(
                principalPlayer.spell1Id
              )}.png`}
              alt={String(principalPlayer.spell1Id)}
            />
            <img
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner${FormatSpell(
                principalPlayer.spell2Id
              )}.png`}
              alt={String(principalPlayer.spell2Id)}
            />
          </div>
        </div>
      </div>

      <main className={styles.infos}>
        <div className={styles.items}>
          <Item icon={principalPlayer.stats.item0} />
          <Item icon={principalPlayer.stats.item1} />
          <Item icon={principalPlayer.stats.item2} />
          <Item icon={principalPlayer.stats.item3} />
          <Item icon={principalPlayer.stats.item4} />
          <Item icon={principalPlayer.stats.item5} />
          <Item icon={principalPlayer.stats.item6} />
        </div>
        <div className={styles.stats}>
          <div>
            <img
              src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/damage_skins_icon.svg"
              alt=""
            />
            <p>
              {principalPlayer.stats.kills} / {principalPlayer.stats.deaths} /{" "}
              {principalPlayer.stats.assists}
            </p>
          </div>

          <div>
            <img src="https://i.ibb.co/VSKK0Fh/icon-minions.png" alt="Gold" />
            <p>{principalPlayer.stats.totalMinionsKilled}</p>
          </div>

          <div>
            <img
              src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/backpack-light-gold.svg"
              alt="Gold"
            />
            <p>{principalPlayer.stats.goldEarned}</p>
          </div>
        </div>
      </main>

      <div className={styles.teams}>
        <div className={styles.team1}>
          {match.participants.slice(0, 5).map((partcipant, index) => {
            return (
              <div
                key={partcipant.participantId}
                className={
                  match.participantIdentities[
                    index
                  ].player.summonerName.toLowerCase() === principalPlayerName
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
                  match.participantIdentities[
                    5 + index
                  ].player.summonerName.toLowerCase() === principalPlayerName
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
