"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, Tag, FileText, ArrowLeft, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/utils/format"

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
    orderNote,
    setOrderNote,
    couponCode,
    applyDiscount,
    removeDiscount,
    discount,
  } = useCart()

  const [mounted, setMounted] = useState(false)
  const [tempNote, setTempNote] = useState("")
  const [tempCoupon, setTempCoupon] = useState("")
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  // Asegurarse de que el componente solo se renderice en el cliente
  useEffect(() => {
    setMounted(true)
    setTempNote(orderNote)
  }, [orderNote])

  if (!mounted) {
    return null
  }

  const handleSaveNote = () => {
    setOrderNote(tempNote)
  }

  const handleApplyCoupon = async () => {
    if (!tempCoupon.trim()) {
      setCouponMessage({ text: "Por favor ingresa un código de cupón", isError: true })
      return
    }

    setIsApplyingCoupon(true)
    setCouponMessage(null)

    try {
      const result = await applyDiscount(tempCoupon)
      setCouponMessage({ text: result.message, isError: !result.success })
      if (result.success) {
        setTempCoupon("")
      }
    } catch (error) {
      setCouponMessage({ text: "Error al aplicar el cupón", isError: true })
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discountAmount = subtotal * discount

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Mi carrito</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">Parece que aún no has añadido ningún vehículo a tu carrito.</p>
          <Link href="/tienda">
            <Button size="lg" className="bg-gray-800 hover:bg-gray-700">
              Explorar vehículos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Productos ({cartItems.length})</h2>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                    <div className="w-full sm:w-32 h-32 relative flex-shrink-0 mb-4 sm:mb-0">
                      <Image
                        src={item.image || "/car-placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="sm:ml-6 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm mb-4">
                        {item.year} • {item.km.toLocaleString()} km
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-3 py-1 border-r"
                            disabled={item.quantity <= 1}
                            aria-label="Disminuir cantidad"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="px-3 py-1 border-l"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Precio unitario</div>
                          <div className="font-bold">{formatCurrency(item.price)}</div>
                          <div className="font-bold text-gray-800">
                            Total: {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sección de cupón y nota */}
              <div className="p-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cupón promocional */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Tag size={16} className="mr-2" /> Código promocional
                    </h3>

                    {couponCode ? (
                      <div className="flex justify-between items-center p-3 bg-green-50 border border-green-100 rounded-md">
                        <div>
                          <span className="text-sm font-medium">Cupón aplicado: {couponCode}</span>
                          <p className="text-xs text-green-600">{discount * 100}% de descuento</p>
                        </div>
                        <button
                          onClick={removeDiscount}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Eliminar cupón"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex space-x-2 mb-2">
                          <input
                            type="text"
                            value={tempCoupon}
                            onChange={(e) => setTempCoupon(e.target.value)}
                            placeholder="Ingresa tu código de cupón"
                            className="flex-1 p-2 border rounded-md"
                          />
                          <Button onClick={handleApplyCoupon} disabled={isApplyingCoupon}>
                            {isApplyingCoupon ? "Aplicando..." : "Aplicar"}
                          </Button>
                        </div>
                        {couponMessage && (
                          <div className={`text-sm mt-2 ${couponMessage.isError ? "text-red-500" : "text-green-600"}`}>
                            {couponMessage.text}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Nota de pedido */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3 flex items-center">
                      <FileText size={16} className="mr-2" /> Nota de pedido
                    </h3>
                    <textarea
                      value={tempNote}
                      onChange={(e) => setTempNote(e.target.value)}
                      placeholder="Añade instrucciones especiales para tu pedido..."
                      className="w-full p-2 border rounded-md"
                      rows={4}
                    />
                    <div className="flex justify-end mt-2">
                      <Button onClick={handleSaveNote} size="sm">
                        Guardar nota
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Link href="/tienda" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft size={16} className="mr-2" /> Continuar comprando
              </Link>

              <Button
                variant="outline"
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={clearCart}
              >
                Vaciar carrito
              </Button>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Resumen del pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento ({discount * 100}%)</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-green-600 font-medium">GRATIS</span>
                </div>
                <div className="text-gray-600 text-sm">Colima, México</div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="text-gray-500 text-sm">Impuestos incluidos</div>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg">Finalizar compra</Button>
              </Link>

              <div className="mt-6 text-center text-sm text-gray-600 flex justify-center items-center">
                <span className="mr-1">🔒</span> Pago seguro
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
