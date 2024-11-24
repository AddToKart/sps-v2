import { useState } from 'react'
import { FiDownload, FiFilter, FiDollarSign, FiTrendingUp, FiPieChart, FiUsers } from 'react-icons/fi'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

function Reports() {
  const [selectedDateRange, setSelectedDateRange] = useState('this-month')
  const [selectedReport, setSelectedReport] = useState('all')

  // Dummy data for charts
  const collectionTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Collections',
        data: [150000, 180000, 165000, 195000, 185000, 200000],
        borderColor: '#0ea5e9',
        backgroundColor: '#0ea5e940',
        fill: true,
      }
    ]
  }

  const paymentMethodData = {
    labels: ['GCash', 'Bank Transfer', 'Cash', 'Credit Card'],
    datasets: [
      {
        data: [156, 98, 45, 23],
        backgroundColor: [
          '#0ea5e9',
          '#0284c7',
          '#0369a1',
          '#075985'
        ],
      }
    ]
  }

  const collectionRateData = {
    labels: ['STEM', 'ABM', 'ICT'],
    datasets: [
      {
        label: 'Collection Rate',
        data: [95, 88, 92],
        backgroundColor: '#0ea5e9',
      }
    ]
  }

  // Chart options
  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Collections Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => '₱' + value.toLocaleString()
        }
      }
    }
  }

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Collection Rate by Strand'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + '%'
        }
      }
    }
  }

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Payment Methods Distribution'
      }
    }
  }

  // Stats data
  const stats = [
    {
      label: 'Total Collections',
      value: '₱1,075,000',
      trend: '+12.5%',
      icon: FiDollarSign
    },
    {
      label: 'Collection Rate',
      value: '92%',
      trend: '+3.2%',
      icon: FiTrendingUp
    },
    {
      label: 'Outstanding Balance',
      value: '₱125,000',
      trend: '-8.4%',
      icon: FiPieChart
    }
  ]

  const handleGenerateReport = () => {
    // Handle report generation logic here
    console.log('Generating report:', { selectedDateRange, selectedReport })
  }

  return (
    <div className="w-full p-4 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-tertiary">Financial Reports</h1>
        <button
          onClick={handleGenerateReport}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
        >
          <FiDownload className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Stats Grid - Similar to Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, trend, icon: Icon }) => (
          <div key={label} className="bg-surface p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-xl font-semibold mt-1">{value}</p>
              </div>
              <div className="flex flex-col items-end">
                <Icon className="w-5 h-5 text-primary" />
                <span className={`text-sm mt-2 ${
                  trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Controls */}
      <div className="bg-surface rounded-lg shadow-sm mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="all">All Reports</option>
                <option value="collections">Collections Report</option>
                <option value="outstanding">Outstanding Balance Report</option>
                <option value="payment-methods">Payment Methods Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Strand Filter
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="all">All Strands</option>
                <option value="stem">STEM</option>
                <option value="abm">ABM</option>
                <option value="ict">ICT</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-surface p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold mb-4">Collections Trend</h3>
          <div className="h-[300px]">
            <Line data={collectionTrendData} options={lineOptions} />
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold mb-4">Payment Methods Distribution</h3>
          <div className="flex items-start">
            <div className="w-1/2">
              <Doughnut data={paymentMethodData} options={{
                ...doughnutOptions,
                plugins: {
                  ...doughnutOptions.plugins,
                  legend: {
                    display: false
                  },
                  title: {
                    display: false
                  }
                }
              }} />
            </div>
            <div className="w-1/2 mt-8">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                    <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                    <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-2 py-1 text-sm">GCash</td>
                    <td className="px-2 py-1 text-sm">156</td>
                    <td className="px-2 py-1 text-sm">₱430,000</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-sm">Bank Transfer</td>
                    <td className="px-2 py-1 text-sm">98</td>
                    <td className="px-2 py-1 text-sm">₱322,500</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-sm">Cash</td>
                    <td className="px-2 py-1 text-sm">45</td>
                    <td className="px-2 py-1 text-sm">₱215,000</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-sm">Credit Card</td>
                    <td className="px-2 py-1 text-sm">23</td>
                    <td className="px-2 py-1 text-sm">₱107,500</td>
                  </tr>
                  <tr className="font-medium bg-gray-50">
                    <td className="px-2 py-1 text-sm">Total</td>
                    <td className="px-2 py-1 text-sm">322</td>
                    <td className="px-2 py-1 text-sm">₱1,075,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-sm font-semibold mb-4">Collection Summary by Strand</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Strand</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Students</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collected</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Outstanding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { strand: 'STEM', students: 150, collected: '₱750,000', outstanding: '₱50,000' },
                    { strand: 'ABM', students: 120, collected: '₱600,000', outstanding: '₱45,000' },
                    { strand: 'ICT', students: 100, collected: '₱500,000', outstanding: '₱30,000' },
                  ].map((item) => (
                    <tr key={item.strand} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{item.strand}</td>
                      <td className="px-4 py-3 text-sm">{item.students}</td>
                      <td className="px-4 py-3 text-sm">{item.collected}</td>
                      <td className="px-4 py-3 text-sm">{item.outstanding}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-sm font-semibold mb-4">Recent Collections</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { date: '2024-03-21', student: 'John Doe', amount: '₱15,000', method: 'GCash' },
                    { date: '2024-03-20', student: 'Jane Smith', amount: '₱12,000', method: 'Bank Transfer' },
                    { date: '2024-03-19', student: 'Bob Wilson', amount: '₱18,000', method: 'Cash' },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{item.date}</td>
                      <td className="px-4 py-3 text-sm">{item.student}</td>
                      <td className="px-4 py-3 text-sm">{item.amount}</td>
                      <td className="px-4 py-3 text-sm">{item.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports 