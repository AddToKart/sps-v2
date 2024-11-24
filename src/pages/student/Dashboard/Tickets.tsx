import { useState } from 'react'
import { FiMessageSquare, FiPlus } from 'react-icons/fi'

interface Ticket {
  id: string
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
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [showNewTicketModal, setShowNewTicketModal] = useState(false)
  const [newTicketSubject, setNewTicketSubject] = useState('')
  const [newTicketMessage, setNewTicketMessage] = useState('')
  const [newMessage, setNewMessage] = useState('')

  // Dummy tickets data - in real app, this would be filtered to show only the current student's tickets
  const myTickets: Ticket[] = [
    {
      id: 'TCKT-001',
      subject: 'Payment Verification Issue',
      status: 'Open',
      priority: 'High',
      createdAt: '2024-03-20 09:30 AM',
      lastUpdated: '2024-03-20 09:30 AM',
      messages: [
        {
          sender: 'You',
          message: 'I made a payment yesterday but it\'s not reflecting in my account.',
          timestamp: '2024-03-20 09:30 AM'
        },
        {
          sender: 'Admin',
          message: 'Thank you for reporting this. We\'ll check and get back to you shortly.',
          timestamp: '2024-03-20 09:45 AM'
        }
      ]
    }
  ]

  const handleSubmitNewTicket = () => {
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return
    
    // In a real app, this would be handled by your backend
    setShowNewTicketModal(false)
    setNewTicketSubject('')
    setNewTicketMessage('')
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return
    setNewMessage('')
  }

  return (
    <div className="w-full min-h-screen bg-background p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-tertiary">My Support Tickets</h1>
        <button
          onClick={() => setShowNewTicketModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Tickets List */}
        <div className="lg:col-span-5 bg-surface rounded-lg shadow-sm">
          <div className="p-4">
            <div className="space-y-2">
              {myTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedTicket?.id === ticket.id
                      ? 'bg-primary bg-opacity-10'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Ticket item content */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
                      <p className="text-xs text-gray-500">Ticket ID: {ticket.id}</p>
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
                  <p className="text-xs text-gray-500 mt-1">
                    Last updated: {ticket.lastUpdated}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="lg:col-span-7 bg-surface rounded-lg shadow-sm">
          {selectedTicket ? (
            <div className="h-full flex flex-col">
              {/* Rest of the chat section implementation */}
              {/* Similar to what we had before but simplified */}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a ticket to view the conversation
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Create New Support Ticket</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Describe your issue in detail"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitNewTicket}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
                >
                  Submit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tickets 