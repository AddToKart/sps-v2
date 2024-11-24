import { useState } from 'react'
import { FiDollarSign, FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Chart options with proper typing
const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f0f0f0',
      },
      ticks: {
        callback: (value) => '₱' + value.toLocaleString()
      }
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}

function Payments() {
  // Stats data for the top cards
  const stats = [
    { label: 'Total Collections', value: '₱523,456', icon: FiDollarSign, trend: '+8.2%' },
    { label: 'This Month', value: '₱123,456', icon: FiCalendar, trend: '+12.3%' },
    { label: 'Pending', value: '₱45,678', icon: FiClock, trend: '-2.1%' },
    { label: 'Success Rate', value: '95%', icon: FiCheckCircle, trend: '+1.2%' },
  ]

  // Payment methods filter options
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('all')
  const [selectedDateRange, setSelectedDateRange] = useState<string>('this-month')

  // Daily collections data for the chart
  const dailyCollectionsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Collections',
        data: [12500, 15000, 18000, 14500, 19000, 16000, 13500],
        borderColor: '#0ea5e9',
        backgroundColor: '#0ea5e940',
        fill: true,
      }
    ],
  }

  // Recent payments data
  const recentPayments = [
    {
      id: 'PAY-001',
      student: 'John Doe',
      amount: '₱15,000',
      method: 'GCash',
      status: 'Completed',
      date: '2024-03-20',
    },
    {
      id: 'PAY-002',
      student: 'Jane Smith',
      amount: '₱12,000',
      method: 'Bank Transfer',
      status: 'Pending',
      date: '2024-03-20',
    },
    {
      id: 'PAY-003',
      student: 'Bob Johnson',
      amount: '₱18,000',
      method: 'Credit Card',
      status: 'Failed',
      date: '2024-03-19',
    },
  ]

  return (
    <div className="w-full h-full p-4 bg-background">
      <h1 className="text-base sm:text-xl font-bold mb-4 text-tertiary">Payments Management</h1>
      
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="all">All Methods</option>
              <option value="gcash">GCash</option>
              <option value="bank">Bank Transfer</option>
              <option value="card">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Charts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        {/* Collections Chart */}
        <div className="lg:col-span-8 bg-surface rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold mb-4 text-tertiary">Daily Collections</h3>
          <div className="w-full h-[300px]">
            <Line 
              data={dailyCollectionsData}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 bg-surface rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold mb-4 text-tertiary">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Record Payment
            </button>
            <button className="w-full border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
              Generate Receipt
            </button>
            <button className="w-full border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-surface rounded-lg shadow-sm">
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-4 text-tertiary">Recent Payments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.student}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'Completed' 
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-primary hover:text-secondary mr-2">View</button>
                      <button className="text-primary hover:text-secondary">Receipt</button>
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

export default Payments 