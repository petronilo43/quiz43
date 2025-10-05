import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "IQ Test",
  description: "Quiz de QI com pagamento via Stripe",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={inter.className}>{children}</body>
    </html>
  );
}