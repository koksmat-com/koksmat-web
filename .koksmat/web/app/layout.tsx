import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CLARITY } from "./global";
import RootLayoutClientSide from "./layout-client";

export default function RootLayout2({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        ><RootLayoutClientSide>

            {children}</RootLayoutClientSide>
          <SpeedInsights />

        </ThemeProvider>
      </body>
    </html>
  );
}
