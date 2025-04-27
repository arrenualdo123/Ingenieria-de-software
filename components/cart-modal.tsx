"use client"
import { useState } from "react"
import { X, Trash2, Plus, Minus, Tag, FileText, ShoppingCart, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { formatCurrency } from "@/utils/format"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

export default function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const {
    cartItems,
    removeFromCart,
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

  const [showNoteInput, setShowNoteInput] = useState(false)
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [tempNote, setTempNote] = useState(orderNote)
  const [tempCoupon, setTempCoupon] = useState("")
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  if (!isOpen) return null

  const handleSaveNote = () => {
    setOrderNote(tempNote)
    setShowNoteInput(false)
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
        setShowCouponInput(false)
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
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay semi-transparente que cubre el resto de la pantalla */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Barra lateral del carrito */}
      <div className="relative w-full max-w-md bg-white h-full overflow-auto shadow-xl flex flex-col animate-slide-in-right">
        <div className="p-4 border-b flex justify-between items-center bg-gray-800 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" /> Mi carrito
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
              <Button onClick={onClose}>Continuar Comprando</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex border-b pb-6">
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image src={item.image || "/car-placeholder.jpg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {item.year} • {item.km.toLocaleString()} km
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center border rounded"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center border rounded"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold">{formatCurrency(item.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-6 space-y-4">
              {/* Cupón promocional */}
              {couponCode ? (
                <div className="flex justify-between items-center p-3 bg-green-50 border border-green-100 rounded-md">
                  <div className="flex items-center">
                    <Tag size={16} className="text-green-600 mr-2" />
                    <div>
                      <span className="text-sm font-medium">Cupón aplicado: {couponCode}</span>
                      <p className="text-xs text-green-600">{discount * 100}% de descuento</p>
                    </div>
                  </div>
                  <button
                    onClick={removeDiscount}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Eliminar cupón"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              ) : showCouponInput ? (
                <div className="p-3 border rounded-md">
                  <div className="flex items-center mb-2">
                    <Tag size={16} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Ingresar código promocional</span>
                  </div>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={tempCoupon}
                      onChange={(e) => setTempCoupon(e.target.value)}
                      placeholder="Código de cupón"
                      className="flex-1 p-2 border rounded-md text-sm"
                    />
                    <Button onClick={handleApplyCoupon} disabled={isApplyingCoupon} size="sm">
                      {isApplyingCoupon ? "Aplicando..." : "Aplicar"}
                    </Button>
                  </div>
                  {couponMessage && (
                    <div className={`text-sm ${couponMessage.isError ? "text-red-500" : "text-green-600"}`}>
                      {couponMessage.text}
                    </div>
                  )}
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowCouponInput(false)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCouponInput(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Tag size={16} className="mr-2" />
                  <span className="text-sm">Ingresar código promocional</span>
                </button>
              )}

              {/* Nota de pedido */}
              {orderNote ? (
                <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="flex items-center">
                    <FileText size={16} className="text-blue-600 mr-2" />
                    <div>
                      <span className="text-sm font-medium">Nota:</span>
                      <p className="text-xs">{orderNote}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNoteInput(true)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Editar nota"
                  >
                    <FileText size={18} />
                  </button>
                </div>
              ) : showNoteInput ? (
                <div className="p-3 border rounded-md">
                  <div className="flex items-center mb-2">
                    <FileText size={16} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Agregar una nota</span>
                  </div>
                  <textarea
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    placeholder="Escribe una nota para tu pedido..."
                    className="w-full p-2 border rounded-md text-sm mb-2"
                    rows={3}
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowNoteInput(false)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancelar
                    </button>
                    <Button onClick={handleSaveNote} size="sm">
                      Guardar nota
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowNoteInput(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <FileText size={16} className="mr-2" />
                  <span className="text-sm">Agregar una nota</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Resumen del pedido */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="space-y-2 mb-4">
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
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/checkout" onClick={onClose}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 py-3">Finalizar compra</Button>
              </Link>

              <Link href="/carrito" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  Ver carrito
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
