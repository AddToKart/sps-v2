import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import DashboardLayout from '@/components/admin/DashboardLayout'

// Lazy load dashboard components
const Overview = lazy(() => import('./Overview'))
const Students = lazy(() => import('./Students'))
const Payments = lazy(() => import('./Payments'))
const Reports = lazy(() => import('./Reports'))
const AuditLogs = lazy(() => import('./AuditLogs'))

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
}

function AdminDashboard() {
  const location = useLocation()

  return (
    <DashboardLayout>
      <Suspense fallback={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex h-screen items-center justify-center"
        >
          Loading...
        </motion.div>
      }>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="h-full"
          >
            <Routes location={location}>
              <Route path="overview" element={<Overview />} />
              <Route path="students/*" element={<Students />} />
              <Route path="payments/*" element={<Payments />} />
              <Route path="reports" element={<Reports />} />
              <Route path="audit-logs" element={<AuditLogs />} />
              <Route path="" element={<Navigate to="overview" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </DashboardLayout>
  )
}

export default AdminDashboard 