import "./globals.css";
import SkipLink from "@/components/a11y/SkipLink";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", 
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Trend Explorer UI",
  description: "Frontend Design Assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            {/* Accessibility */}
            <SkipLink />

            
            <main id="main-content" role="main">
              {children}
            </main>

        
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
