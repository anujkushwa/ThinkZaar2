import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import SyncUser from "@/components/SyncUser"; // ✅ FIXED

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ThinkZaar",
  description: "Collaborative problem solving platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          
          <SyncUser /> {/* 🔥 AUTO USER SYNC */}
          <Navbar />   {/* 🔥 AUTH BASED NAVBAR */}

          <main className="flex-1">{children}</main>

        </body>
      </html>
    </ClerkProvider>
  );
}