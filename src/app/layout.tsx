"use client"
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./provider/query.provider";
import { AuthProvider } from "./provider/auth.provider";
import { SessionProvider } from 'next-auth/react';

const geistSans = localFont({
  src: "./assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
        <SessionProvider >
          <AuthProvider>
            <Providers>
              {children}
            </Providers>
          </AuthProvider>
        </SessionProvider>
      </body>

    </html>
  );
}
