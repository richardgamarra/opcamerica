import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPCAmerica — One Person Company for the Americas",
  description: "The bilingual EN/ES community for solo founders building scalable AI-powered businesses from Canada to Argentina.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
