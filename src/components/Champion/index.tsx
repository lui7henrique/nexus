/* eslint-disable @next/next/no-img-element */

import { ChampionType } from "./types";

export function Champion({
  id,
  name,
  title,
  blurb,
  image,
  tags,
}: ChampionType) {
  return (
    <div className="champion">
      <div className="imageContainer">
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${id}.png`}
          alt={`${id} Image`}
        />
      </div>
      <div className="infos">
        <h3>
          <strong>{name}</strong>
        </h3>
      </div>
    </div>
  );
}
