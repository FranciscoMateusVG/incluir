import { UserProvider } from "@auth0/nextjs-auth0/client";
import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "~/layout/Layout";
import "~/styles/globals.css";

// Create a client
const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
