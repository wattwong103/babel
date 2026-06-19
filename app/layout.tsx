import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Babel — Knowledge Technology Tree",
  description: "Build your tower of knowledge, one discovery at a time.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen bg-babel-bg font-body text-babel-text-secondary antialiased">
        {children}
      </body>
    </html>
  );
}
