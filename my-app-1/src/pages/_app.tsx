import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/Appshell";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* Google Analytics Script */}
      
      {/* Load GA library */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        strategy="afterInteractive"
      />

      {/* Init GA */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXX');
        `}
      </Script>

      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
  );
}