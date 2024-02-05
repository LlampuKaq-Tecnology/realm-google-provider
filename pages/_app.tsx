import Solved from "@/Solved";
import "@/styles/globals.css";
import { RealmProvider } from "@llampukaq/realm";
import { Provider } from "cllk";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Solved>
        <RealmProvider appId={process.env.NEXT_PUBLIC_REALM as string}>
          <Component {...pageProps} />
        </RealmProvider>
      </Solved>
    </Provider>
  );
}
