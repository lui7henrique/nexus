/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import { Header } from "../../components/Header";
import { ItemType } from "../../types/items";
import styles from "./styles.module.scss";

export default function Items({ data }: any) {
  const items: ItemType[] = Object.values(data.data);
  return (
    <div className={styles.container}>
      <title>Nexus | Items</title>

      <Header />
      <main className={styles.content}>
        {items.map((item) => {
          return (
            <div key={item.name}>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${item.image.full}`}
                alt=""
              />
              <div>
                <h1>{item.name}</h1>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/11.14.1/data/pt_BR/item.json"
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 24 * 7, // 1 week
  };
};
