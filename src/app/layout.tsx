import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
// import { extractRouterConfig } from "uploadthing/server";

// import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import TopNav from "./_components/top-nav";
// import { ourFileRouter } from "./api/uploadthing/core";

export const metadata = {
  title: "T3 Gallery",
  description: "Generated by a loyal subscriber to Theo on Youtube",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="bg-black text-white">
          {/* <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             
            routerConfig={extractRouterConfig(ourFileRouter)}
          /> */}
          <div className="grid h-screen grid-rows-[auto,1fr]">
            <TopNav />
            <main className="overflow-y-scroll">{children}</main>
          </div>
          {modal}
          <div id="modal-root" />
        </body>
      </html>
    </ClerkProvider>
  );
}
