import { SidebarProvider } from '@/components/ui/sidebar'
import { DashboardNavbar } from '@/modules/dashboard/ui/components/dashboard-navbar'
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar'

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar/>
      <main className="flex flex-col  w-screen bg-muted">
        <DashboardNavbar/>
        { children }
      </main>
    </SidebarProvider>
  )
}