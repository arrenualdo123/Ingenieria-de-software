import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CartProvider } from "@/hooks/use-cart"
import { NotificationsProvider } from "@/context/NotificationsContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TasDrives - Compra y venta de autos",
  description: "Empresa de compra y venta de autos. Customización tuning.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <NotificationsProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </NotificationsProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
