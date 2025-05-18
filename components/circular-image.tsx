import Image from "next/image"
import { cn } from "@/lib/utils"

interface CircularImageProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showBorder?: boolean
  borderColor?: string
}

export function CircularImage({
  src,
  alt,
  size = "md",
  className,
  showBorder = true,
  borderColor = "border-gray-200 dark:border-gray-700",
}: CircularImageProps) {
  // Definir tamaños
  const sizes = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  }

  // Definir borde
  const border = showBorder ? `border-2 ${borderColor}` : ""

  return (
    <div className={cn("relative rounded-full overflow-hidden", sizes[size], border, className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        className="object-cover object-center"
        fill
        sizes={`(max-width: 768px) 100vw, ${size === "xl" ? "256px" : size === "lg" ? "192px" : size === "md" ? "128px" : "96px"}`}
      />
    </div>
  )
}
