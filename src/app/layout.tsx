import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
// import SearchBox from "@/components/SearchBox";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MovieWorld",
  description: "A movies next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="sticky top-0 z-50">
          <Header />
        </div>

        {children}

        <Footer />
      </body>
    </html>
  );
}
