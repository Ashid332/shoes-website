import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NIKE | Premium Footwear",
  description: "Experience the next generation of footwear. Engineered for peak performance, designed for unparalleled style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-white">
        <AuthProvider>
          {children}
          <CartDrawer />
        </AuthProvider>
      </body>
    </html>
  );
}
