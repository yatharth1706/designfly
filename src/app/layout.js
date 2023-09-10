import "./globals.css";
import { Inter } from "next/font/google";
import AppProvider from "@/contexts/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Designfly",
  description: "Create and show the world your designs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
