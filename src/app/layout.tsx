import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./global.css";
import { Providers } from "@/lib/provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700"]});

export const metadata: Metadata = {
  title: "Alex Su | Front-End Developer",
  description: "Website of Alex Su, aka yeeway.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className} flex flex-col items-center`}>
        <Providers>
          <Header />
          <div className="container pb-8 pt-16">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
