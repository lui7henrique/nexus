/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Header } from "../components/Header";
import { useRouter } from "next/router";

export default function Page404() {
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
      <title>Nexus | 404</title>
      <Header />

      <main className="content">
        <section className="hero">
          <h2>Página não encontrada 😭 </h2>
          <h1>Parece que você encontrou o Amumu chorando, </h1>
          <span>
            você pode dar um abraço
            <strong>
              <a
                href="https://github.com/lui7henrique"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                nele,{" "}
              </a>
            </strong>
            ou voltar a
            <strong>
              <Link href="/">
                <a> navegar!</a>
              </Link>
            </strong>
          </span>
        </section>
        <img src="amumu.png" alt="" />
      </main>
    </div>
  );
}
