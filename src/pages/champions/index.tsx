import Link from "next/link";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Champion } from "../../components/Champion";
import { ChampionType } from "../../components/Champion/types";
import styles from "./styles.module.scss";
import { capitalize } from "../../utils/capitalize";
import { Header } from "../../components/Header";

const defaultLanguage = "pt_BR";
const defaultEndpoint = `http://ddragon.leagueoflegends.com/cdn/11.13.1/data/${defaultLanguage}/champion.json`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function Champions({ data }: any) {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [currentPage, setCurrentPage] = useState(
    `http://ddragon.leagueoflegends.com/cdn/11.13.1/data/${currentLanguage}/champion.json`
  );
  const initialValues = Object.values(data.data);
  const [champions, setChampions] = useState<ChampionType[]>(
    initialValues as ChampionType[]
  );
  const [currentTarget, setCurrentTarget] = useState("");

  useEffect(() => {
    async function request() {
      const res = await fetch(currentPage);
      const data = await res.json();
      setChampions(Object.values(data.data));
    }
    request();
  }, [champions, currentPage]);

  function handleSubmitSearch(event: React.FormEvent) {
    event.preventDefault();

    setCurrentPage(
      `http://ddragon.leagueoflegends.com/cdn/11.13.1/data/${currentLanguage}/champion/${capitalize(
        currentTarget
      )}.json`
    );
  }

  return (
    <div className={styles.container}>
      <title>Nexus | Champions</title>

      <Header />
      <main className={styles.content}>
        <section className={styles.infos}>
          <h1>🚧</h1>
          <p>Em construção...</p>
        </section>

        <div className={styles.champions}>
          <form className={styles.searchChampion} onSubmit={handleSubmitSearch}>
            <input
              type="text"
              placeholder="Procure um campeão pelo nome completo 😈"
              onChange={(e) => setCurrentTarget(e.target.value)}
            />
            <button className={styles.searchButton}>
              <MdSearch size={25} />
            </button>
          </form>

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
