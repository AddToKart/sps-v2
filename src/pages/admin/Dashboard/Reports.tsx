import { useState } from 'react'
import { FiMessageSquare, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

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

function Reports() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Dummy tickets data
  const tickets: Ticket[] = [
    {
      id: 'TCKT-001',
      student: 'John Doe',
      subject: 'Payment Verification Issue',
      status: 'Open',
      priority: 'High',
      createdAt: '2024-03-20 09:30 AM',
      lastUpdated: '2024-03-20 09:30 AM',
      messages: [
        {
          sender: 'John Doe',
          message: 'I made a payment yesterday but it\'s not reflecting in my account.',
          timestamp: '2024-03-20 09:30 AM'
        }
      ]
    },
    {
      id: 'TCKT-002',
      student: 'Jane Smith',
      subject: 'Receipt Not Received',
      status: 'In Progress',
      priority: 'Medium',
      createdAt: '2024-03-19 02:15 PM',
      lastUpdated: '2024-03-20 10:45 AM',
      messages: [
        {
          sender: 'Jane Smith',
          message: 'I haven\'t received my payment receipt via email.',
          timestamp: '2024-03-19 02:15 PM'
        },
        {
          sender: 'Admin',
          message: 'We\'re looking into this issue. Could you please provide your transaction reference number?',
          timestamp: '2024-03-20 10:45 AM'
        }
      ]
    },
    {
      id: 'TCKT-003',
      student: 'Bob Wilson',
      subject: 'Payment Plan Inquiry',
      status: 'Resolved',
      priority: 'Low',
      createdAt: '2024-03-18 11:20 AM',
      lastUpdated: '2024-03-19 03:30 PM',
      messages: [
        {
          sender: 'Bob Wilson',
          message: 'I would like to request for a payment plan extension.',
          timestamp: '2024-03-18 11:20 AM'
        },
        {
          sender: 'Admin',
          message: 'Your payment plan has been extended by 30 days.',
          timestamp: '2024-03-19 03:30 PM'
        }
      ]
    }
  ]

  // Stats for the dashboard
  const stats = [
    { label: 'Total Tickets', value: '45', icon: FiMessageSquare, trend: '+5.2%' },
    { label: 'Open Tickets', value: '12', icon: FiClock, trend: '-2.1%' },
    { label: 'Resolved Today', value: '8', icon: FiCheckCircle, trend: '+12.3%' },
    { label: 'Avg Response Time', value: '2.5h', icon: FiAlertCircle, trend: '-8.4%' },
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return

    // In a real app, this would be handled by your backend
    const updatedTicket = {
      ...selectedTicket,
      messages: [
        ...selectedTicket.messages,
        {
          sender: 'Admin',
          message: newMessage,
          timestamp: new Date().toLocaleString()
        }
      ],
      lastUpdated: new Date().toLocaleString()
    }
    setSelectedTicket(updatedTicket)
    setNewMessage('')
  }

  return (
    <div className="w-full h-full p-4 bg-background">
      <h1 className="text-base sm:text-xl font-bold mb-4 text-tertiary">Support Tickets</h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Tickets List */}
        <div className="lg:col-span-5 bg-surface rounded-lg shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-tertiary">Tickets</h2>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="space-y-2">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedTicket?.id === ticket.id
                      ? 'bg-primary bg-opacity-10'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
                      <p className="text-xs text-gray-500">{ticket.student}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.status === 'Open' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : ticket.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : ticket.status === 'Resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <span>Last updated: {ticket.lastUpdated}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      ticket.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : ticket.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="lg:col-span-7 bg-surface rounded-lg shadow-sm">
          {selectedTicket ? (
            <div className="h-full flex flex-col">
              {/* Ticket Header */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-tertiary">{selectedTicket.subject}</h2>
                    <p className="text-sm text-gray-500">Ticket ID: {selectedTicket.id}</p>
                  </div>
                  <select
                    value={selectedTicket.status}
                    className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedTicket.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'Admin'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a ticket to view the conversation
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reports 