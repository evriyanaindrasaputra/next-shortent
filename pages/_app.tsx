import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from "@trpc/next";
import { AppRouter} from '~/server/route/app.router'
import superjson from 'superjson'

console.log(process.env.BASE_URL)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    // const url = process.env.BASE_URL
    //   ? `https://${process.env.BASE_URL}/api/trpc`
    //   : 'http://localhost:3000/api/trpc';
    const url = "https://next-shortent.vercel.app/api/trpc"

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
