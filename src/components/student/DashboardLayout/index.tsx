import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiDollarSign, FiMessageSquare, FiMenu, FiX, FiLogOut } from 'react-icons/fi'
import { useState } from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

function StudentDashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  
  const navItems = [
    { path: 'overview', label: 'Overview', icon: FiHome },
    { path: 'payments', label: 'Payments', icon: FiDollarSign },
    { path: 'tickets', label: 'Support Tickets', icon: FiMessageSquare },
  ]

  const handleLogout = () => {
    // For now, just navigate to login page
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-surface rounded-lg shadow-md"
      >
        {isSidebarOpen ? (
          <FiX className="w-6 h-6 text-tertiary" />
        ) : (
          <FiMenu className="w-6 h-6 text-tertiary" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-surface shadow-md
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        flex flex-col
      `}>
        <div className="p-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-tertiary"
          >
            SPS Student
          </motion.h1>
        </div>
        
        {/* Navigation items */}
        <nav className="mt-4 flex-1">
          {navItems.map(({ path, label, icon: Icon }, index) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/student/${path}`}
                className={`flex items-center px-4 py-3 text-gray-700 hover:bg-surface-hover transition-colors relative ${
                  location.pathname.includes(path) ? 'text-primary' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
                {location.pathname.includes(path) && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-surface-hover transition-colors rounded-lg"
          >
            <FiLogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  )
}

export default StudentDashboardLayout 