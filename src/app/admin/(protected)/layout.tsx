import AdminProtectedWrapper from '@/app/admin/(auth)/AdminProtectedWrapper'
import { Sidebar } from './components/Sidebar'

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProtectedWrapper>
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminProtectedWrapper>
  )
}