import { Mastery as MasteryType } from "../../types/summoner";
import styles from "./styles.module.scss";

/* eslint-disable @next/next/no-img-element */
export function Mastery(unformattedMastery: any) {
  const mastery: MasteryType = unformattedMastery.mastery;

  return (
    <div className={styles.mastery} key={mastery.championId}>
      <img
        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${mastery.championId}.png`}
        alt="Maestry champion icon"
        className={styles.iconMastery}
      />
      {mastery.championLevel > 3 && (
        <img
          src={`https://lolg-cdn.porofessor.gg/img/masteries/lvl${mastery.championLevel}.png`}
          alt={`Maestria nível ${mastery.championLevel}`}
          className={styles.masteryLevel}
        />
      )}
      <div>
        <p>{mastery.championPoints}</p>
        {mastery.chestGranted && (
          <img
            src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/icon-chest-acquired.png"
            alt="Chest"
            className={styles.chest}
          />
        )}
      </div>
    </div>
  );
}
