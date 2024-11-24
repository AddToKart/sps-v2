import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiUsers, FiDollarSign, FiFileText, FiActivity, FiMenu, FiX, FiLogOut, FiUser, FiMessageSquare, FiSettings } from 'react-icons/fi'
import { useState } from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  
  const navItems = [
    { path: 'overview', label: 'Overview', icon: FiHome },
    { path: 'students', label: 'Students', icon: FiUsers },
    { path: 'payments', label: 'Payments', icon: FiDollarSign },
    { path: 'reports', label: 'Reports', icon: FiFileText },
    { path: 'tickets', label: 'Support Tickets', icon: FiMessageSquare },
    { path: 'audit-logs', label: 'Audit Logs', icon: FiActivity },
    { path: 'profile', label: 'Profile', icon: FiUser },
    { path: 'settings', label: 'Settings', icon: FiSettings },
  ]

  const handleLogout = () => {
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
          <FiX className="w-6 h-6 text-gray-600" />
        ) : (
          <FiMenu className="w-6 h-6 text-gray-600" />
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
        flex flex-col border-r border-gray-200
      `}>
        <div className="p-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900"
          >
            SPS Admin
          </motion.h1>
        </div>

        {/* Navigation Items */}
        <nav className="mt-4 flex-1">
          {navItems.map(({ path, label, icon: Icon }, index) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/admin/${path}`}
                className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors relative ${
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

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FiUser className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Admin User</h3>
              <p className="text-xs text-gray-600">admin@sps.edu</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors rounded-lg"
          >
            <FiLogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 lg:pt-0 bg-background">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout 