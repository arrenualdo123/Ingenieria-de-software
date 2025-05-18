import type React from "react"
import AdminProtected from "@/components/auth/admin-protected"
import AdminSidebar from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProtected>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <AdminSidebar />
        <div className="flex-1 p-8">{children}</div>
      </div>
    </AdminProtected>
  )
}
