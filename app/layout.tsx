import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "Apertre Admin",
  description: "",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
