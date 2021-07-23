/* eslint-disable @next/next/no-img-element */
import { Rank } from "../../types/summoner";
import { transformNumber } from "../../utils/transformNumber";
import { winRate } from "../../utils/winrate";
import styles from "./styles.module.scss";
import { FormatGame } from "../../utils/formatGame";

export function Tier(unformattedRank: any) {
  const rank: Rank = unformattedRank.unformattedRank;

  return (
    <div className={styles.tier}>
      <img
        src={`https://opgg-static.akamaized.net/images/medals/${rank.tier.toLowerCase()}_${transformNumber(
          rank.rank
        )}.png?image=q_auto:best&v=1`}
        alt=""
      />
      <div>
        <h5>{FormatGame(rank.queueType)}</h5>
        <h4>
          {rank.tier} {rank.rank}
        </h4>
        <p>
          {rank.leaguePoints} PDL ({rank.wins}W / {rank.losses}L)
        </p>
        <p>Taxa de Vitória {winRate(rank.wins, rank.losses)}%</p>
      </div>
    </div>
  );
}
