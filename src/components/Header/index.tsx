/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.scss";
import { SiGithub } from "react-icons/si";
import { useRouter } from "next/router";

export function Header() {
  const { asPath } = useRouter();
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
            <a className={asPath === "/" ? styles.active : ""}>Home</a>
          </Link>
          <Link href="/champions">
            <a className={asPath === "/champions" ? styles.active : ""}>
              Champions
            </a>
          </Link>
          <Link href="/items">
            <a className={asPath === "/items" ? styles.active : ""}>Items</a>
          </Link>
          <Link href="/icons">
            <a className={asPath === "/icons" ? styles.active : ""}>Icons</a>
          </Link>
        </nav>
      </div>
      <button>
        <a
          href="https://github.com/lui7henrique"
          target="_blank"
          rel="noreferrer"
        >
          <SiGithub size={15} />
        </a>
      </button>
    </header>
  );
}
