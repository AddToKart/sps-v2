import { useState } from 'react'
import { FiActivity, FiUsers, FiAlertCircle, FiClock } from 'react-icons/fi'

interface AuditLog {
  id: string
  action: string
  user: string
  userType: 'Admin' | 'Student' | 'System'
  timestamp: string
  details: string
  ipAddress: string
  status: 'Success' | 'Warning' | 'Error'
}

function AuditLogs() {
  const [selectedDateRange, setSelectedDateRange] = useState('today')
  const [selectedAction, setSelectedAction] = useState('all')
  const [selectedUser, setSelectedUser] = useState('all')

  // Stats for the dashboard
  const stats = [
    { label: 'Total Activities', value: '2,345', icon: FiActivity, trend: '+12.5%' },
    { label: 'Active Users', value: '156', icon: FiUsers, trend: '+5.2%' },
    { label: 'System Events', value: '45', icon: FiAlertCircle, trend: '-2.1%' },
    { label: 'Avg. Response', value: '1.2s', icon: FiClock, trend: '-8.4%' },
  ]

  // Dummy audit logs data
  const auditLogs: AuditLog[] = [
    {
      id: 'LOG-001',
      action: 'Payment Recorded',
      user: 'Admin User',
      userType: 'Admin',
      timestamp: '2024-03-20 10:30 AM',
      details: 'Recorded payment of ₱15,000 for student John Doe',
      ipAddress: '192.168.1.100',
      status: 'Success'
    },
    {
      id: 'LOG-002',
      action: 'Login Attempt',
      user: 'Jane Smith',
      userType: 'Student',
      timestamp: '2024-03-20 10:15 AM',
      details: 'Failed login attempt from unrecognized device',
      ipAddress: '192.168.1.101',
      status: 'Warning'
    },
    {
      id: 'LOG-003',
      action: 'System Backup',
      user: 'System',
      userType: 'System',
      timestamp: '2024-03-20 10:00 AM',
      details: 'Automated daily backup completed',
      ipAddress: 'localhost',
      status: 'Success'
    },
    {
      id: 'LOG-004',
      action: 'Student Record Updated',
      user: 'Admin User',
      userType: 'Admin',
      timestamp: '2024-03-20 09:45 AM',
      details: 'Updated contact information for student Bob Wilson',
      ipAddress: '192.168.1.100',
      status: 'Success'
    },
    {
      id: 'LOG-005',
      action: 'Payment Failed',
      user: 'Payment System',
      userType: 'System',
      timestamp: '2024-03-20 09:30 AM',
      details: 'Payment processing failed for transaction ID: TXN-123',
      ipAddress: 'localhost',
      status: 'Error'
    }
  ]

  return (
    <div className="w-full h-full p-4 bg-background">
      <h1 className="text-base sm:text-xl font-bold mb-4 text-tertiary">System Audit Logs</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {stats.map(({ label, value, icon: Icon, trend }) => (
          <div key={label} className="bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
            <div className="flex items-center justify-between">
              <Icon className="w-5 h-5 text-primary" />
              <span className={`text-xs ${
                trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'
              }`}>
                {trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-xs mt-2">{label}</h3>
            <p className="text-lg font-bold text-tertiary">{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-lg shadow-sm p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="all">All Actions</option>
              <option value="payment">Payment Related</option>
              <option value="user">User Activity</option>
              <option value="system">System Events</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="all">All Users</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="system">System</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-surface rounded-lg shadow-sm">
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{log.user}</span>
                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          log.userType === 'Admin'
                            ? 'bg-purple-100 text-purple-800'
                            : log.userType === 'Student'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {log.userType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        log.status === 'Success'
                          ? 'bg-green-100 text-green-800'
                          : log.status === 'Warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuditLogs 