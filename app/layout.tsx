import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import SessionProvider from "./../components/providers/session-provider";
import Header from "@/components/organisms/Header";
import { getServerSession } from "next-auth";
import { options } from "@/lib/auth";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord clone",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(options);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
        <ThemeProvider
          defaultTheme="system"
          attribute="class"
          enableSystem
          storageKey="discord-theme"
        >
          <ModalProvider/>
          {/* <SessionProvider session={session}>
            <Header />
          </SessionProvider> */}
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
