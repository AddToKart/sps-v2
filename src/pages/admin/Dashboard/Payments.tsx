import { useState } from 'react'
import { FiDollarSign, FiCalendar, FiClock, FiSettings, FiUsers, FiAlertCircle, FiBell } from 'react-icons/fi'

interface PaymentReminder {
  id: string
  type: 'Due Date' | 'Overdue' | 'Custom'
  daysBeforeDue: number
  message: string
  isActive: boolean
}

interface PaymentPlan {
  id: string
  name: string
  installments: number
  intervalDays: number
  downPaymentPercentage: number
  isActive: boolean
}

function Payments() {
  const [activeTab, setActiveTab] = useState('reminders')
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [showPlanModal, setShowPlanModal] = useState(false)

  // Payment Reminders State
  const [reminders, setReminders] = useState<PaymentReminder[]>([
    {
      id: '1',
      type: 'Due Date',
      daysBeforeDue: 7,
      message: 'Your payment is due in {days} days. Total amount: {amount}',
      isActive: true
    },
    {
      id: '2',
      type: 'Overdue',
      daysBeforeDue: 1,
      message: 'Your payment is overdue by {days} days. Please settle immediately.',
      isActive: true
    }
  ])

  // Payment Plans State
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([
    {
      id: '1',
      name: 'Monthly Plan',
      installments: 10,
      intervalDays: 30,
      downPaymentPercentage: 20,
      isActive: true
    },
    {
      id: '2',
      name: 'Quarterly Plan',
      installments: 4,
      intervalDays: 90,
      downPaymentPercentage: 25,
      isActive: true
    }
  ])

  return (
    <div className="w-full p-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-6 text-tertiary">Payment Management</h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-surface p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FiUsers className="w-5 h-5 text-primary" />
              <span className="text-xs text-rose-500">15 Students</span>
            </div>
            <h3 className="text-sm text-gray-500">Overdue Payments</h3>
            <p className="text-lg font-bold text-tertiary">₱245,000</p>
          </div>

          <div className="bg-surface p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FiCalendar className="w-5 h-5 text-primary" />
              <span className="text-xs text-emerald-500">Due This Week</span>
            </div>
            <h3 className="text-sm text-gray-500">Upcoming Payments</h3>
            <p className="text-lg font-bold text-tertiary">₱180,000</p>
          </div>

          <div className="bg-surface p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FiBell className="w-5 h-5 text-primary" />
              <span className="text-xs text-blue-500">Last 7 Days</span>
            </div>
            <h3 className="text-sm text-gray-500">Reminders Sent</h3>
            <p className="text-lg font-bold text-tertiary">45</p>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-surface rounded-lg shadow-sm">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('reminders')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'reminders'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Payment Reminders
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'plans'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Payment Plans
              </button>
              <button
                onClick={() => setActiveTab('automation')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'automation'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Automation Rules
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'reminders' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Payment Reminders</h2>
                  <button
                    onClick={() => setShowReminderModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
                  >
                    Add Reminder
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reminders.map((reminder) => (
                        <tr key={reminder.id}>
                          <td className="px-4 py-3 text-sm">{reminder.type}</td>
                          <td className="px-4 py-3 text-sm">{reminder.daysBeforeDue}</td>
                          <td className="px-4 py-3 text-sm">{reminder.message}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              reminder.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {reminder.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <button className="text-primary hover:text-secondary mr-2">Edit</button>
                            <button className="text-red-600 hover:text-red-800">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'plans' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Payment Plans</h2>
                  <button
                    onClick={() => setShowPlanModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
                  >
                    Add Plan
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentPlans.map((plan) => (
                    <div key={plan.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{plan.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          plan.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {plan.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>Installments: {plan.installments}</p>
                        <p>Interval: {plan.intervalDays} days</p>
                        <p>Down Payment: {plan.downPaymentPercentage}%</p>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button className="text-primary hover:text-secondary">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'automation' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Automation Rules</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FiClock className="w-5 h-5 text-primary mr-2" />
                        <div>
                          <h3 className="font-medium">Late Payment Detection</h3>
                          <p className="text-sm text-gray-500">Automatically flag overdue payments</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FiBell className="w-5 h-5 text-primary mr-2" />
                        <div>
                          <h3 className="font-medium">Automatic Reminders</h3>
                          <p className="text-sm text-gray-500">Send reminders based on schedule</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FiAlertCircle className="w-5 h-5 text-primary mr-2" />
                        <div>
                          <h3 className="font-medium">Payment Notifications</h3>
                          <p className="text-sm text-gray-500">Send notifications for new payments</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payments 