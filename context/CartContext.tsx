"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  image?: string
  quantity: number
  year: number
  km: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  cartTotal: number
  itemCount: number
  orderNote: string
  setOrderNote: (note: string) => void
  couponCode: string
  setCouponCode: (code: string) => void
  discount: number
  applyDiscount: (code: string) => Promise<{ success: boolean; message: string }>
  removeDiscount: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Lista de cupones válidos (en un caso real, esto vendría de una base de datos)
const validCoupons = [
  { code: "TASDRIVES10", discount: 0.1, message: "10% de descuento aplicado" },
  { code: "VERANO2023", discount: 0.15, message: "15% de descuento aplicado" },
  { code: "BIENVENIDO", discount: 0.05, message: "5% de descuento aplicado" },
]

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [orderNote, setOrderNote] = useState<string>("")
  const [couponCode, setCouponCode] = useState<string>("")
  const [discount, setDiscount] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const storedCart = localStorage.getItem("cart")
    const storedNote = localStorage.getItem("orderNote")
    const storedCoupon = localStorage.getItem("couponCode")
    const storedDiscount = localStorage.getItem("discount")

    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        setCartItems([])
      }
    }

    if (storedNote) {
      setOrderNote(storedNote)
    }

    if (storedCoupon) {
      setCouponCode(storedCoupon)
    }

    if (storedDiscount) {
      setDiscount(Number(storedDiscount))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, mounted])

  // Save note to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("orderNote", orderNote)
    }
  }, [orderNote, mounted])

  // Save coupon and discount to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("couponCode", couponCode)
      localStorage.setItem("discount", discount.toString())
    }
  }, [couponCode, discount, mounted])

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id)

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity by the specified amount
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return updatedItems
      } else {
        // Item doesn't exist, add new item with the specified quantity
        return [...prevItems, { ...item, quantity: quantity }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
    setOrderNote("")
    setCouponCode("")
    setDiscount(0)
    localStorage.removeItem("orderNote")
    localStorage.removeItem("couponCode")
    localStorage.removeItem("discount")
  }

  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)),
    )
  }

  // Apply discount coupon
  const applyDiscount = async (code: string): Promise<{ success: boolean; message: string }> => {
    // Simular una llamada a API con un pequeño retraso
    await new Promise((resolve) => setTimeout(resolve, 500))

    const coupon = validCoupons.find((c) => c.code === code.toUpperCase())

    if (coupon) {
      setCouponCode(code.toUpperCase())
      setDiscount(coupon.discount)
      return { success: true, message: coupon.message }
    } else {
      return { success: false, message: "Cupón inválido o expirado" }
    }
  }

  // Remove discount
  const removeDiscount = () => {
    setCouponCode("")
    setDiscount(0)
  }

  // Calculate subtotal (before discount)
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate discount amount
  const discountAmount = subtotal * discount

  // Calculate total price (after discount)
  const cartTotal = subtotal - discountAmount

  // Calculate total number of items
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal,
        itemCount,
        orderNote,
        setOrderNote,
        couponCode,
        setCouponCode,
        discount,
        applyDiscount,
        removeDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
