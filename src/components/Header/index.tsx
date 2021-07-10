/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.scss";
import { SiGithub } from "react-icons/si";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div>
        <Link href="/">
          <a>
            <h1 className={styles.logo}>Nexus</h1>
          </a>
        </Link>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/champions/all">
            <a>Champions</a>
          </Link>
          <Link href="/items">
            <a>Items</a>
          </Link>
        </nav>
      </div>
      <button>
        <a
          href="https://github.com/lui7henrique"
          target="_blank"
          rel="noreferrer"
        >
          <SiGithub />
          Github
        </a>
      </button>
    </header>
  );
}
