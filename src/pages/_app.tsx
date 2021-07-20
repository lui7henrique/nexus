import type { AppProps } from "next/app";
import "./../styles/global.scss";
import "./../styles/container.scss";
import "./../styles/home.scss";
import "../components/Champion/styles.scss";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
