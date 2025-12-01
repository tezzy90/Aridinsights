import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AridInsights | Water Intelligence Platform for Compliance-Driven Markets",
    description: "Water intelligence infrastructure for fragmented regulatory markets. Start with groundwater compliance in Texas. Expand to ESG water risk and municipal finance.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-brand-muted dark:bg-slate-950 text-brand-text dark:text-slate-300 antialiased selection:bg-brand-primary selection:text-white transition-colors duration-300`}>
                <ThemeProvider>
                    <div className="min-h-screen flex flex-col font-sans">
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                        <ThemeToggle />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
