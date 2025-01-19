import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import { Toaster } from "sonner";

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
      <body className={`antialiased ${inter.className} bg-slate-950`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
