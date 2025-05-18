import Link from "next/link"
import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
        <LoginForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-red-600 hover:text-red-800 font-medium">
              Regístrate
            </Link>
          </p>

          <p className="mt-2 text-sm text-gray-600">
            <Link href="/forgot-password" className="text-gray-600 hover:text-gray-800">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
