import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/header/header";

import AIHelper from "@/components/AIHelper";

import Footer from "@/components/footer";
import BgFixed from "@/components/bgfixed";


import CustomFont from 'next/font/local'

const Involve = CustomFont({
  src: "../public/fonts/Involve-Regular.ttf",
  variable: '--font-Involve'
})

const DejaVu = CustomFont(
  {
    src: "../public/fonts//DejaVuSans-ExtraLight.ttf",
    variable: '--font-DejaVu'
  }
)

export const metadata: Metadata = {
  title: "Отчёты губернаторов Енисейской губернии",
  description: "Отчёты военных губернаторов г. Красноярска и гражданских губернаторов Енисейской губернии с момента основания губернии в 1822 году и до революции",
  /*
  icons: {
    icon: [
      {
        rel: 'icon',
        url: '/images/icons/favicon-lightTheme.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        rel: 'icon',
        url: '/images/icons/favicon-darkTheme.ico',
        media: '(prefers-color-scheme: dark)',
      },
    ]
  }
  */
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/icons/favicon-darkTheme.ico" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/images/icons/favicon-lightTheme.ico" media="(prefers-color-scheme: light)" />
        <link rel="apple-touch-icon" href="/images/icons/apple-touch-icon.png?v=4" sizes="<generated>" />
      </head>
      <body className={`${Involve.variable} ${DejaVu.variable} scroll-smooth flex flex-col items-start overflow-x-hidden bg-back`}>
        {/*
        <BgFixed />
        */}
        <Header />

        <div className="relative container flex flex-col justify-between mx-auto px-4 md:px-12 min-h-screen md:shadow-neutral-300 md:shadow-md bg-white">
          {children}
          <Footer />
        </div>
        <AIHelper />
      </body>
    </html>
  );
}
