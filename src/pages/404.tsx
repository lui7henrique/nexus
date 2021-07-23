/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Header } from "../components/Header";

export default function Page404() {
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
