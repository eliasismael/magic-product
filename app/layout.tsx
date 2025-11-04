import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProductsContextProvider } from "./context/ProductsContext";

import GlobalModals from "./components/GlobalModals";
import { Footer } from "./components/shared/Footer";
import { Header } from "./components/shared/Header";
import { Web3Providers } from "./providers/Web3Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Magic Product",
  description: "Administra tus productos de la manera más eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Providers>
          <ProductsContextProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1    bg-slate-100 ">{children}</main>

              <Footer />
              <GlobalModals />
            </div>
          </ProductsContextProvider>
        </Web3Providers>
      </body>
    </html>
  );
}
