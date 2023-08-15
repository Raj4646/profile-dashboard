import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'


export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        <Sidebar></Sidebar>
        <Navbar></Navbar>
        {children}
        </>
    )
  }