import { useState } from 'react'
import { FiCalendar, FiDollarSign, FiSettings, FiSave, FiPlus, FiTrash2 } from 'react-icons/fi'

interface PaymentSchedule {
  id: string
  name: string
  dueDate: string
  gracePeriod: number
  lateFee: number
  isActive: boolean
}

interface FeeStructure {
  id: string
  name: string
  amount: number
  description: string
  isRequired: boolean
  applicableTo: string[]
}

function Settings() {
  const [activeTab, setActiveTab] = useState('payment-schedules')
  
  // Payment Schedules State
  const [paymentSchedules, setPaymentSchedules] = useState<PaymentSchedule[]>([
    {
      id: '1',
      name: 'Monthly Payment',
      dueDate: '5',
      gracePeriod: 7,
      lateFee: 500,
      isActive: true
    },
    {
      id: '2',
      name: 'Quarterly Payment',
      dueDate: '15',
      gracePeriod: 10,
      lateFee: 1000,
      isActive: true
    }
  ])

  // Fee Structure State
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([
    {
      id: '1',
      name: 'Tuition Fee',
      amount: 35000,
      description: 'Basic tuition fee per semester',
      isRequired: true,
      applicableTo: ['STEM', 'ABM', 'ICT']
    },
    {
      id: '2',
      name: 'Laboratory Fee',
      amount: 5000,
      description: 'Laboratory equipment and materials',
      isRequired: true,
      applicableTo: ['STEM']
    }
  ])

  // System Preferences State
  const [systemPreferences, setSystemPreferences] = useState({
    allowLatePayments: true,
    autoApplyLateFee: true,
    sendPaymentReminders: true,
    reminderDays: 3,
    allowPartialPayments: true,
    minimumPartialAmount: 5000
  })

  const handleSavePreferences = () => {
    // Handle saving system preferences
    console.log('Saving preferences:', systemPreferences)
  }

  return (
    <div className="w-full p-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-6 text-tertiary">System Settings</h1>

        {/* Settings Navigation */}
        <div className="bg-surface rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('payment-schedules')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'payment-schedules'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Payment Schedules
            </button>
            <button
              onClick={() => setActiveTab('fee-structure')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'fee-structure'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Fee Structure
            </button>
            <button
              onClick={() => setActiveTab('system-preferences')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'system-preferences'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              System Preferences
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-surface rounded-lg shadow-sm p-6">
          {/* Payment Schedules Tab */}
          {activeTab === 'payment-schedules' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Payment Schedules</h2>
                <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Schedule
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grace Period</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Late Fee</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentSchedules.map((schedule) => (
                      <tr key={schedule.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{schedule.name}</td>
                        <td className="px-4 py-3 text-sm">Every {schedule.dueDate}th</td>
                        <td className="px-4 py-3 text-sm">{schedule.gracePeriod} days</td>
                        <td className="px-4 py-3 text-sm">₱{schedule.lateFee}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            schedule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {schedule.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button className="text-primary hover:text-secondary mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Fee Structure Tab */}
          {activeTab === 'fee-structure' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Fee Structure</h2>
                <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Fee
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicable To</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {feeStructures.map((fee) => (
                      <tr key={fee.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{fee.name}</td>
                        <td className="px-4 py-3 text-sm">₱{fee.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">{fee.description}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            fee.isRequired ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {fee.isRequired ? 'Required' : 'Optional'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{fee.applicableTo.join(', ')}</td>
                        <td className="px-4 py-3 text-sm">
                          <button className="text-primary hover:text-secondary mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* System Preferences Tab */}
          {activeTab === 'system-preferences' && (
            <div>
              <h2 className="text-lg font-semibold mb-6">System Preferences</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Payment Settings */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Payment Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Allow Late Payments</label>
                        <input
                          type="checkbox"
                          checked={systemPreferences.allowLatePayments}
                          onChange={(e) => setSystemPreferences({
                            ...systemPreferences,
                            allowLatePayments: e.target.checked
                          })}
                          className="rounded text-primary focus:ring-primary"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Auto-apply Late Fees</label>
                        <input
                          type="checkbox"
                          checked={systemPreferences.autoApplyLateFee}
                          onChange={(e) => setSystemPreferences({
                            ...systemPreferences,
                            autoApplyLateFee: e.target.checked
                          })}
                          className="rounded text-primary focus:ring-primary"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Allow Partial Payments</label>
                        <input
                          type="checkbox"
                          checked={systemPreferences.allowPartialPayments}
                          onChange={(e) => setSystemPreferences({
                            ...systemPreferences,
                            allowPartialPayments: e.target.checked
                          })}
                          className="rounded text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Send Payment Reminders</label>
                        <input
                          type="checkbox"
                          checked={systemPreferences.sendPaymentReminders}
                          onChange={(e) => setSystemPreferences({
                            ...systemPreferences,
                            sendPaymentReminders: e.target.checked
                          })}
                          className="rounded text-primary focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Reminder Days Before Due</label>
                        <input
                          type="number"
                          value={systemPreferences.reminderDays}
                          onChange={(e) => setSystemPreferences({
                            ...systemPreferences,
                            reminderDays: parseInt(e.target.value)
                          })}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Minimum Partial Payment Amount</label>
                        <input
                          type="number"
                          value={systemPreferences.minimumPartialAmount}
                          onChange={(e) => setSystemPreferences({
                            ...systemPreferences,
                            minimumPartialAmount: parseInt(e.target.value)
                          })}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSavePreferences}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
                  >
                    <FiSave className="w-4 h-4 mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings 