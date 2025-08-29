"use client";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.polygon],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Anon Share",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#175d6c",
              accentColorForeground: "white",
              borderRadius: "small",
              fontStack: "system",
              overlayBlur: "small",
            })}
            chains={chains}
          >
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
