/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Header } from "../components/Header";
import { useRouter } from "next/router";

export default function Home() {
  const [summoner, setSummoner] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function handleSubmitSearch(e: React.FormEvent) {
    e.preventDefault();
    {
      summoner.length >= 3
        ? router.push(`/summoner/${summoner}`)
        : setError("Nick inválido :(");
    }
  }

  return (
    <div className="container">
      <title>Nexus | Home</title>
      <Header />

      <main className="content">
        <section className="hero">
          <span>Seja bem-vindo(a) ao Nexus! 🤗</span>
          <h1>Busque por histórico de partidas</h1>
          <p>
            ou informações sobre{" "}
            <strong>
              invocadores,
              <Link href="/champions">
                <a> campeões,</a>
              </Link>
              <Link href="/items">
                <a> itens </a>
              </Link>
            </strong>
            e muito mais!
          </p>

          <form onSubmit={handleSubmitSearch}>
            <input
              type="text"
              placeholder="Busque por um invocador"
              onChange={(e) => setSummoner(e.target.value)}
            />
            <button>
              <MdSearch size={25} />
            </button>
          </form>
        </section>
        <img src="leesin.png" alt="" />
      </main>
    </div>
  );
}
