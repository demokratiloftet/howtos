import type { Metadata } from "next";
import Link from "next/link";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SITE_NAME } from "@/lib/howtos";
import "./globals.css";

const sans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "Korte, praktiske veiledninger for vanlige oppgaver i Atmosphere.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nb" className={`${sans.variable} ${serif.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-line">
          <div className="px-5 py-4 sm:px-8">
            <Link href="/" className="inline-flex items-baseline gap-1.5">
              <span className="font-serif text-lg font-semibold">Demokratiløftet</span>
              <span className="text-muted">– dokumentasjon</span>
            </Link>
          </div>
        </header>
        <main className="w-full flex-1 px-5 py-14 sm:px-8 sm:py-20">{children}</main>
        <footer className="border-t border-line">
          <div className="px-5 py-6 text-sm text-muted sm:px-8">
            Innholdet er lisensiert under{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/deed.no"
              className="underline underline-offset-4 hover:text-foreground"
            >
              CC BY 4.0
            </a>
            .
          </div>
        </footer>
      </body>
    </html>
  );
}
