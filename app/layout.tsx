import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "../components/SiteHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
