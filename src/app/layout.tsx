import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { Providers } from "@/lib/provider";
import Header from '@/components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alex Su | Front-End Developer",
  description: "Website of Alex Su, aka yeeway.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
