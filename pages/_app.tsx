import '../styles/globals.css'
import React from 'react';
import type { AppProps } from 'next/app'
import { withTRPC } from "@trpc/next";
import { AppRouter } from '~/server/route/app.router'
import superjson from 'superjson'
import { DefaultSeo } from 'next-seo';
import siteConfig from '~/lib/site-config';
import Head from 'next/head';
import { getSession, SessionProvider } from 'next-auth/react';
import { AppType } from 'next/dist/shared/lib/utils';


const meta = {
  siteName: siteConfig.site_name,
  title: siteConfig.site_name,
  tagline: siteConfig.site_tagline,
  description: siteConfig.site_description,
  url: siteConfig.site_url
}


const MyApp: AppType = ({ Component, pageProps, router }) => {
  return (
    <>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <DefaultSeo
          canonical={`${meta.url}${router.asPath || "/"}`}
          description={meta.description}
          openGraph={{
            type: 'website',
            locale: "id_ID",
            title: meta.title,
            description: meta.description,
            site_name: meta.siteName,
            images: [{
              url: "https://twitter.com/eindrasap/photo",
              alt: 'twitter @eindrasap',
              height: 640,
              width: 1427,
            }]
          }}
          title={siteConfig.site_tagline}
          titleTemplate={`%s | ${meta.siteName}`}
          twitter={{
            handle: '@eindrasap',
            site: '@eindrasap',
            cardType: "summary_large_image"
          }}
        />
        <Head>
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

// MyApp.getInitialProps = async ({ ctx }) => {
//   return {
//     pageProps: {
//       session: await getSession(ctx),
//     },
//   };
// };

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.NEXT_PUBLIC_BASE_URL
      ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

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
