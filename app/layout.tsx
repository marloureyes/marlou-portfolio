import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";

const Roboto = localFont({
  src: "./fonts/RobotoVF.ttf",
  variable: "--font-roboto",
  weight: "100 200 300 400 500 600 700 800",
});

const ConsolasRegular = localFont({
  src: "./fonts/ConsolasRegularVF.ttf",
  variable: "--font-consolas",
  weight: "400",
});

const ConsolasBold = localFont({
  src: "./fonts/ConsolasBoldVF.ttf",
  variable: "--font-consolas-bold",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Marlou | Front-End Developer & Designer",
  description:
    "The personal portfolio of Marlou, a passionate front-end developer and graphic designer focused on creative and user-friendly web solutions.",
  openGraph: {
    title: "Marlou | Front-End Developer & Designer",
    description:
      "Explore Marlou's creative work in web development and design.",
    url: "https://yourdomain.com",
    siteName: "Marlou Portfolio",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marlou Portfolio Preview",
      },
    ],
    type: "website",
  },
  authors: [{ name: "Marlou Reyes" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Roboto.className}  ${ConsolasRegular.variable} ${ConsolasBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
