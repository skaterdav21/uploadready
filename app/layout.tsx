import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "UploadReady — Fix files so they actually upload",
  description:
    "Convert, resize, compress, merge, and split files for job applications, forms, and document uploads. Fix file size and format issues instantly.",
  metadataBase: new URL("https://uploadready.org"),
};

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
