import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import StudentDashboardLayout from '@/components/student/DashboardLayout'

// Lazy load dashboard components
const Overview = lazy(() => import('./Overview'))
const Payments = lazy(() => import('./Payments'))
const Tickets = lazy(() => import('./Tickets'))

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

function StudentDashboard() {
  const location = useLocation()

  return (
    <StudentDashboardLayout>
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
              <Route path="payments/*" element={<Payments />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="" element={<Navigate to="overview" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </StudentDashboardLayout>
  )
}

export default StudentDashboard 