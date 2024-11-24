import { useState } from 'react'
import { FiDollarSign, FiCalendar, FiClock, FiAlertCircle } from 'react-icons/fi'

function Overview() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('gcash')
  const [paymentAmount, setPaymentAmount] = useState('')

  // Dummy student data
  const studentInfo = {
    name: 'John Doe',
    id: 'STD-2024-001',
    course: 'Grade 11 - STEM',
    totalBalance: 45000,
    dueDate: '2024-04-15',
    balanceBreakdown: [
      { fee: 'Tuition Fee', amount: 35000, paid: 25000, remaining: 10000 },
      { fee: 'Miscellaneous', amount: 8000, paid: 5000, remaining: 3000 },
      { fee: 'Laboratory Fee', amount: 5000, paid: 0, remaining: 5000 },
      { fee: 'Development Fee', amount: 2000, paid: 0, remaining: 2000 },
    ]
  }

  const handlePayment = () => {
    // Handle payment logic here
    setShowPaymentModal(false)
  }

  return (
    <div className="w-full p-4 bg-background dark:bg-gray-900">
      {/* Student Info Card */}
      <div className="bg-surface rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-tertiary">{studentInfo.name}</h1>
            <p className="text-sm text-gray-500">Student ID: {studentInfo.id}</p>
            <p className="text-sm text-gray-500">{studentInfo.course}</p>
          </div>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-surface dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <FiDollarSign className="w-5 h-5 text-primary" />
            <span className="text-xs text-rose-500">Due {studentInfo.dueDate}</span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-xs mt-2">Total Balance</h3>
          <p className="text-lg font-bold text-tertiary dark:text-white">₱{studentInfo.totalBalance.toLocaleString()}</p>
        </div>
        
        <div className="bg-surface dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <FiClock className="w-5 h-5 text-primary" />
            <span className="text-xs text-emerald-500">On Track</span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-xs mt-2">Payment Status</h3>
          <p className="text-lg font-bold text-tertiary dark:text-white">Regular Payment</p>
        </div>

        <div className="bg-surface dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <FiCalendar className="w-5 h-5 text-primary" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Next Due Date</span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-xs mt-2">Due Date</h3>
          <p className="text-lg font-bold text-tertiary dark:text-white">April 15, 2024</p>
        </div>
      </div>

      {/* Balance Breakdown */}
      <div className="bg-surface rounded-lg shadow-sm">
        <div className="p-4">
          <h2 className="text-base font-semibold mb-4 text-tertiary">Balance Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remaining</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentInfo.balanceBreakdown.map((fee) => (
                  <tr key={fee.fee} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{fee.fee}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₱{fee.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-green-600">₱{fee.paid.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-red-600">₱{fee.remaining.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      {fee.remaining > 0 && (
                        <button
                          onClick={() => {
                            setPaymentAmount(fee.remaining.toString())
                            setShowPaymentModal(true)
                          }}
                          className="text-primary hover:text-secondary"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-white">Make Payment</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to Pay
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="gcash">GCash</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Overview 