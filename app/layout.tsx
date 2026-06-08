import type { Metadata } from "next";
import { JetBrains_Mono, Poppins, Oxanium } from "next/font/google";
import "./globals.css";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-syne",  // display font slot
// });

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",   // keep the same variable name — no other files need changing
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",  // mono font slot
});

export const metadata: Metadata = {
  title: "Agentic System Architecture",
  description: "8 principles for building proper agentic systems",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${oxanium.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}