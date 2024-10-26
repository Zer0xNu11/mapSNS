import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const noto_Sans_JP = Noto_Sans_JP({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Putterec",
  description: "Location-based SNS application for solo travelers",
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/large-icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

export const   viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#b8e986" />
      </head>
      <body className={`${noto_Sans_JP.className} bg-gray-500`}>
        {children}
      </body>
    </html>
  );
}
