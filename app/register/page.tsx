import Link from "next/link"
import RegisterForm from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
        <RegisterForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-red-600 hover:text-red-800 font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
