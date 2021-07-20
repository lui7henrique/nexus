/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ChampionFull } from "../../types/types";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import styled from "styled-components";
import styles from "./styles.module.scss";
import { SwiperSkins } from "../../components/SwiperSkins";

interface IHeadingStyled {
  background: string;
}

const Banner = styled.div<IHeadingStyled>`
  width: 100%;
  height: 400px;
  background-image: ${(props) => `url(${props.background})`};
  background-position: fixed;
  background-position: 50% 20%;
  @media (max-width: 500px) {
    background-position: 90% 100%;
  }
  background-attachment: fixed;
  background-repeat: no-repeat;
  padding: 16rem 5%;
  font-size: 2rem;
  border-radius: 0.5rem;
  filter: brightness(0.7);
  transition: all 0.2s ease-in-out;

  &:hover {
    filter: brightness(1);
  }

  div {
    h1 {
      display: inline-block;
      text-align: center;
      background-color: rgba(63, 63, 63, 0.3);
      backdrop-filter: blur(5px) saturate(100%) contrast(90%) brightness(150%);
      color: var(--title);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 10px;
      margin-top: 10rem;
      padding: 0 1rem;
    }
  }
`;

export default function Champion({
  champion: unformattedChampion,
}: {
  champion: ChampionFull;
}) {
  const semiFormatted = Object.values(unformattedChampion);

  const champion = semiFormatted[0];

  const splashArt = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;

  return (
    <div className={styles.container}>
      <title>Nexus | {champion.name}</title>

      <div className={styles.header}>
        <Link href="/champions">
          <a>
            <button className="back-button">
              <MdArrowBack size={25} />
            </button>
          </a>
        </Link>
      </div>

      <Banner background={splashArt}>
        <div>
          <h1>{champion.name}</h1>
        </div>
      </Banner>

      <div className={styles.information}>
        <div className={styles.texts}>
          <div>
            <h1>LORE</h1>
            <p>{champion.lore}</p>
          </div>
        </div>

        <div className={styles.skills}>
          <div className={styles.skill}>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/passive/${champion.passive.image.full}`}
              alt=""
            />
            <div>
              <h4>{champion.passive.name}</h4>
              <p>{champion.passive.description}</p>
            </div>
          </div>
          {champion.spells.map((spell) => {
            return (
              <div key={spell.id} className={styles.skill}>
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/spell/${spell.id}.png`}
                  alt=""
                />
                <div>
                  <h4>{spell.name}</h4>
                  <p>{spell.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.divider}>
        <h1>Skins</h1>
      </div>

      <SwiperSkins skins={champion.skins} champion={champion.id} />
    </div>
  );
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/11.13.1/data/pt_BR/champion/${params.id}.json`
  );
  const data = await res.json();
  const champion = data.data;

  return {
    props: {
      champion,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json"
  );
  const { data } = await res.json();
  const champions = Object.keys(data);

  const paths = champions.map((champion) => ({
    params: { id: champion },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
