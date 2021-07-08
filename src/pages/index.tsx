/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Champion } from "../components/Champion";
import { ChampionType } from "../components/Champion/types";
import { MdSearch } from "react-icons/md";
import { capitalize } from "../utils/capitalize";
import Link from "next/link";

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

export default function Home({ data }: any) {
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

  function handleSetLanguage() {
    currentLanguage === "pt_BR"
      ? setCurrentLanguage("en_US")
      : setCurrentLanguage("pt_BR");

    setCurrentPage(
      `http://ddragon.leagueoflegends.com/cdn/11.13.1/data/${currentLanguage}/champion.json`
    );
  }

  return (
    <div className="home">
      {/* header ===========================================================   */}
      <div className="header">
        <h1 className="logo">lol</h1>
        <div>
          <form className="search" onSubmit={handleSubmitSearch}>
            <input
              type="text"
              placeholder="Search by a champion or summoner 😈"
              onChange={(e) => setCurrentTarget(e.target.value)}
            />
            <button className="searchButton">
              <MdSearch size={25} />
            </button>
          </form>
          <button onClick={handleSetLanguage} className="changeLanguageButton">
            {currentLanguage}
          </button>
        </div>
      </div>

      {/* champions ===========================================================   */}
      <div className="content">
        <div className="infos">
          <h1>caralho</h1>
        </div>
        <div className="championsList">
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
        </div>
      </div>
    </div>
  );
}
