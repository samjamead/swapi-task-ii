import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { cn } from "@/lib/utils";
import QueryProvider from "./query-provider";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

export const metadata: Metadata = {
  title: "SWAPI Task II",
  description: "The libraries strike back",
};

const appWidth = "max-w-lg md:max-w-xl lg:max-w-4xl";
const bodyGutter = "px-3";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inconsolata.variable, "antialiased")}>
        <QueryProvider>
          <div className="flex min-h-svh flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <Header maxWidth={appWidth} bodyGutter={bodyGutter} />
              <div className={cn(bodyGutter)}>
                <div className={cn("mx-auto w-full", appWidth)}>{children}</div>
              </div>
            </div>
            <Footer maxWidth={appWidth} bodyGutter={bodyGutter} />
          </div>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
