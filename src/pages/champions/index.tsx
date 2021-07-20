import Link from "next/link";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Champion } from "../../components/Champion";
import { ChampionType } from "../../components/Champion/types";
import styles from "./styles.module.scss";
import { capitalize } from "../../utils/capitalize";
import { Header } from "../../components/Header";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/11.13.1/data/pt_BR/champion.json"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 24 * 30, // 1 month
  };
};

export default function Champions({ data }: any) {
  // page with all champions
  const [currentPage, setCurrentPage] = useState(
    `http://ddragon.leagueoflegends.com/cdn/11.13.1/data/pt_BR/champion.json`
  );

  const initialValues = Object.values(data.data);
  const [champions, setChampions] = useState<ChampionType[]>(
    initialValues as ChampionType[]
  );

  useEffect(() => {
    async function request() {
      const res = await fetch(currentPage);
      const data = await res.json();
      setChampions(Object.values(data.data));
    }
    request();
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <title>Nexus | Champions</title>

      <Header />
      <main className={styles.content}>
        <div className={styles.champions}>
          <section className={styles.championsList}>
            {champions.map((champion) => {
              return (
                <Link href={`champion/${champion.id}`} key={champion.id}>
                  <a>
                    <Champion
                      name={champion.name}
                      id={champion.id}
                      title={champion.title}
                      blurb={champion.blurb}
                      image={champion.image}
                      tags={champion.tags}
                    />
                  </a>
                </Link>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}
