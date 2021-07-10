import { GetServerSideProps } from "next";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

export default function Summoner() {
  return (
    <div className={styles.container}>
      <Header />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log(`ok`);

  return {
    props: {
      nome: "Diego",
    },
  };
};
