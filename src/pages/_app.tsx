import type { AppProps } from "next/app";
import "./../styles/global.scss";
import "./../styles/container.scss";
import "./../styles/champion.scss";
import "../components/Champion/styles.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;