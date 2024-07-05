import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./global.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Providers } from "@/lib/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "900"]});

export const metadata: Metadata = {
  title: "Alex Su's Blog",
  description: "Website of Alex Su, aka yeeway.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className} flex flex-col items-center`}>
        <Providers>
          <Header />
          <div className="container py-16">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-CCEVLQFSHY" />
    </html>
  );
}
