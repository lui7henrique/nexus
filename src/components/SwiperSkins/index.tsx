/* eslint-disable @next/next/no-img-element */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import styled from "styled-components";
import { FormatDefault } from "../../utils/formatDefault";

type Skin = {
  chromas: boolean;
  id: string;
  name: string;
  num: number;
};

type SkinsType = {
  skins: Skin[];
  champion: string;
};

interface ISkinInterface {
  champion: string;
  skin: number;
}

const Skin = styled.div<ISkinInterface>`
  width: 100%;
  height: 400px;
  background-image: ${(props) =>
    `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.champion}_${props.skin}.jpg)`};
  padding: 20rem 5%;
  font-size: 2rem;
  filter: brightness(0.7);
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
  @media (max-width: 768px) {
    background-image: ${(props) =>
      `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${props.champion}_${props.skin}.jpg)`};
    background-size: 100%;
  }

  &:hover {
    filter: brightness(1);
  }

  h1 {
    display: inline-block;
    background-color: rgba(63, 63, 63, 0.3);
    backdrop-filter: blur(5px) saturate(100%) contrast(90%) brightness(150%);
    color: var(--title);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    padding: 0 1rem;
    font-size: 2rem;
    margin-top: 15rem;
  }
`;

SwiperCore.use([Navigation]);

export function SwiperSkins({ skins, champion }: SkinsType) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        navigation={true}
        autoplay={{ delay: 4000 }}
        style={{
          width: "100%",
          flex: "1",
        }}
      >
        {skins.map((skin) => {
          return (
            <SwiperSlide key={skin.id}>
              <Skin champion={champion} skin={skin.num}>
                <h1>{FormatDefault(skin.name)}</h1>
              </Skin>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
