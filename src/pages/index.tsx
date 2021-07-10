/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Header } from "../components/Header";

function handleSubmitSearch(event: React.FormEvent) {
  event.preventDefault();
}

export default function Home() {
  return (
    <div className="container">
      <title>Nexus | Home</title>
      <Header />

      <main className="content">
        <section className="hero">
          <span>Seja bem-vindo(a) ao Nexus! 🤗</span>
          <h1>Busque por históricos de partidas</h1>
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
              onChange={(e) => console.log(e.target.value)}
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
