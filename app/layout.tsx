import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/hooks/use-cart" // Cambiado de @/context/CartContext a @/hooks/use-cart
import { NotificationsProvider } from "@/context/NotificationsContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TAS Drives - Venta de Autos",
  description: "Encuentra los mejores autos usados y nuevos en TAS Drives",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <NotificationsProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
              </NotificationsProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
