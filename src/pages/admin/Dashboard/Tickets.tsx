import { useState } from 'react'
import { FiMessageSquare, FiFilter, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi'

interface Ticket {
  id: string
  student: string
  subject: string
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
  priority: 'Low' | 'Medium' | 'High'
  createdAt: string
  lastUpdated: string
  messages: {
    sender: string
    message: string
    timestamp: string
  }[]
}

function Tickets() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Dummy tickets data
  const tickets: Ticket[] = [
    {
      id: 'TKT-001',
      student: 'John Doe',
      subject: 'Payment Plan Request',
      status: 'Open',
      priority: 'High',
      createdAt: '2024-03-21',
      lastUpdated: '2024-03-21',
      messages: [
        {
          sender: 'John Doe',
          message: 'I would like to request a payment plan for my remaining balance.',
          timestamp: '2024-03-21 09:00 AM'
        }
      ]
    },
    // Add more dummy tickets...
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Resolved': return 'bg-green-100 text-green-800'
      case 'Closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="w-full p-4 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-tertiary">Support Tickets</h1>
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-lg shadow-sm mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tickets..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-surface rounded-lg shadow-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{ticket.id}</td>
                    <td className="px-4 py-3 text-sm">{ticket.student}</td>
                    <td className="px-4 py-3 text-sm">{ticket.subject}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{ticket.createdAt}</td>
                    <td className="px-4 py-3 text-sm">
                      <button className="text-primary hover:text-secondary">
                        View
                      </button>
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

export default Tickets 