/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Header } from "../components/Header";
import { useRouter } from "next/router";

export default function Page404() {
  return (
    <div className="container">
      <title>Nexus | Invocador não encontrado</title>
      <Header />

      <main className="content">
        <section className="hero">
          <h2>Não encontramos nada 🙄</h2>
          <span>
            você pode voltar à
            <strong>
              <Link href="/">
                <a> página inicial </a>
              </Link>
            </strong>
            para buscar outros invocadores,
          </span>
          <p>
            ou explorar
            <Link href="/champions">
              <a> campeões,</a>
            </Link>
            <Link href="/items">
              <a> itens </a>
            </Link>
            ou
            <Link href="/icons">
              <a> ícones</a>
            </Link>
            !
          </p>
        </section>
        <img src="lucian.png" alt="" className="lucian" />
      </main>
    </div>
  );
}
