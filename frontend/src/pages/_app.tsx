import CustomAxios from "@/commons/lib/CustomAxios.setting";
import Layout from "@/components/commons/layout";
import { globalStyles } from "@/components/commons/styles/globalStyles";
import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import { io } from "socket.io-client";

export const socket = io("http://localhost:8000/chattings", {
  withCredentials: true,
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CustomAxios>
          <Global styles={globalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CustomAxios>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
