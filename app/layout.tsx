import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserratHeading = Montserrat({subsets:['latin'],variable:'--font-heading'});
const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "BusMo Demo",
  description:
    "Basic demo of BusMo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full font-sans antialiased", "font-sans", notoSans.variable, montserratHeading.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
