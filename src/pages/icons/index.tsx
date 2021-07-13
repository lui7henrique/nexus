/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import { useState } from "react";
import { Header } from "../../components/Header";
import { IconType } from "../../types/icon";
import styles from "./styles.module.scss";

export default function Icons({ data }: any) {
  const icons: IconType[] = Object.values(data.data);
  const [targets, setTargets] = useState(50);

  const [currentTargets, setcurrentTargets] = useState(icons.slice(0, targets));
  console.log(currentTargets);

  function handleLoadmore() {
    setTargets(targets + 50);
    setcurrentTargets(icons.slice(0, targets));
  }

  return (
    <div className={styles.container}>
      <title>Nexus | Ícons </title>

      <Header />
      <main className={styles.content}>
        {currentTargets.map((icon) => {
          return (
            <img
              key={icon.id}
              src={`http://ddragon.leagueoflegends.com/cdn/11.14.1/img/profileicon/${icon.id}.png`}
              alt=""
            />
          );
        })}
      </main>
      <button onClick={handleLoadmore}>Carregar mais</button>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/profileicon.json"
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 24 * 30, // 1 month
  };
};
