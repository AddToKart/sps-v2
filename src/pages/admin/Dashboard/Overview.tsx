import { FiUsers, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi'
import { Bar, Doughnut, Line, Pie, Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  LineElement,
  RadialLinearScale,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  RadialLinearScale
)

// Define strand colors
const strandColors = {
  STEM: '#0ea5e9', // Sky blue 500
  ABM: '#0284c7', // Sky blue 600
  ICT: '#0369a1', // Sky blue 700
}

function Overview() {
  // Stats data
  const stats = [
    { label: 'Total Students', value: '1,234', icon: FiUsers, trend: '+5.2%' },
    { label: 'Total Collections', value: '₱123,456', icon: FiDollarSign, trend: '+12.3%' },
    { label: 'Unpaid Students', value: '123', icon: FiClock, trend: '-2.1%' },
    { label: 'Payment Rate', value: '95%', icon: FiCheckCircle, trend: '+1.2%' },
  ]

  // Unpaid students by strand
  const unpaidByStrandData = {
    labels: ['STEM', 'ABM', 'ICT'],
    datasets: [
      {
        label: 'Number of Unpaid Students',
        data: [45, 32, 28],
        backgroundColor: [
          strandColors.STEM,
          strandColors.ABM,
          strandColors.ICT,
        ],
      },
    ],
  }

  // Unpaid students by grade and strand
  const unpaidByGradeAndStrandData = {
    labels: ['Grade 11', 'Grade 12'],
    datasets: [
      {
        label: 'STEM',
        data: [25, 20],
        backgroundColor: strandColors.STEM,
      },
      {
        label: 'ABM',
        data: [18, 14],
        backgroundColor: strandColors.ABM,
      },
      {
        label: 'ICT',
        data: [15, 13],
        backgroundColor: strandColors.ICT,
      },
    ],
  }

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: window.innerWidth < 768 ? 1.2 : 1.5,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'start',
        labels: {
          boxWidth: 8,
          padding: 4,
          font: {
            size: window.innerWidth < 768 ? 8 : 10
          }
        },
      },
      title: {
        display: true,
        text: 'Unpaid Students by Grade Level and Strand',
        padding: { bottom: 4 },
        font: {
          size: window.innerWidth < 768 ? 10 : 12
        }
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          maxTicksLimit: 8,
        },
        grid: {
          color: '#f0f0f0',
        },
      },
    },
  }

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: window.innerWidth < 768 ? 1.2 : 1.5,
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center',
        labels: {
          boxWidth: 8,
          padding: 4,
          font: {
            size: window.innerWidth < 768 ? 8 : 10
          }
        },
      },
      title: {
        display: true,
        text: 'Distribution of Unpaid Students by Strand',
        padding: { bottom: 4 },
        font: {
          size: window.innerWidth < 768 ? 10 : 12
        }
      },
    },
    cutout: '70%',
  }

  // Payment trends over time (last 6 months)
  const paymentTrendsData = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Tuition',
        data: [85000, 92000, 78000, 89000, 95000, 91000],
        borderColor: strandColors.STEM,
        backgroundColor: strandColors.STEM + '40',
        fill: true,
      },
      {
        label: 'Miscellaneous',
        data: [25000, 28000, 22000, 24000, 27000, 26000],
        borderColor: strandColors.ABM,
        backgroundColor: strandColors.ABM + '40',
        fill: true,
      },
      {
        label: 'Other Fees',
        data: [15000, 17000, 14000, 16000, 18000, 17000],
        borderColor: strandColors.ICT,
        backgroundColor: strandColors.ICT + '40',
        fill: true,
      },
    ],
  }

  // Payment status breakdown with more detailed categories
  const paymentStatusData = {
    labels: [
      'Fully Paid',
      'Partial - On Track',
      'Partial - Delayed',
      'No Payment - New',
      'No Payment - Overdue'
    ],
    datasets: [
      {
        data: [45, 25, 15, 8, 7],
        backgroundColor: [
          '#22c55e', // Green for fully paid
          '#3b82f6', // Blue for on track
          '#eab308', // Yellow for delayed
          '#f97316', // Orange for new
          '#ef4444', // Red for overdue
        ],
      },
    ],
  }

  // Let's add payment method distribution
  const paymentMethodData = {
    labels: ['GCash', 'Bank Transfer', 'Cash', 'Credit Card', 'PayMaya'],
    datasets: [
      {
        data: [40, 25, 20, 10, 5],
        backgroundColor: [
          '#6366f1', // Indigo for GCash
          '#06b6d4', // Cyan for Bank Transfer
          '#84cc16', // Lime for Cash
          '#ec4899', // Pink for Credit Card
          '#8b5cf6', // Purple for PayMaya
        ],
      },
    ],
  }

  // Performance metrics data (new)
  const performanceData = {
    labels: [
      'Collection',  // Shortened labels for better fit
      'Compliance',
      'On-time',
      'Digital',
      'Early Pay'
    ],
    datasets: [
      {
        label: 'Current Period',
        data: [95, 88, 85, 78, 72],
        backgroundColor: 'rgba(14, 165, 233, 0.2)', // Sky blue with opacity
        borderColor: '#0ea5e9',
        borderWidth: 2,
        pointBackgroundColor: '#0ea5e9',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0ea5e9',
        pointRadius: 4,
      },
      {
        label: 'Previous Period',
        data: [90, 85, 80, 70, 65],
        backgroundColor: 'rgba(2, 132, 199, 0.2)', // Darker sky blue with opacity
        borderColor: '#0284c7',
        borderWidth: 2,
        pointBackgroundColor: '#0284c7',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0284c7',
        pointRadius: 4,
      },
    ],
  }

  return (
    <div className="w-full h-full p-4 bg-background">
      <h1 className="text-base sm:text-xl font-bold mb-4 text-tertiary">Dashboard Overview</h1>
      
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

      {/* Charts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        {/* Left Column - Bar Chart */}
        <div className="lg:col-span-8 bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
          <h3 className="text-sm font-semibold mb-4 text-tertiary">Unpaid Students by Grade & Strand</h3>
          <div className="w-full h-[300px]">
            <Bar 
              data={unpaidByGradeAndStrandData} 
              options={{
                ...barChartOptions,
                maintainAspectRatio: false,
                plugins: {
                  ...barChartOptions.plugins,
                  legend: {
                    ...barChartOptions.plugins?.legend,
                    labels: {
                      ...barChartOptions.plugins?.legend?.labels,
                      color: '#0369a1', // Text color matching theme
                    },
                  },
                },
              }} 
            />
          </div>
        </div>

        {/* Right Column - Payment Status */}
        <div className="lg:col-span-4 bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
          <h3 className="text-sm font-semibold mb-4 text-tertiary">Payment Status</h3>
          <div className="w-full h-[300px]">
            <Pie 
              data={{
                ...paymentStatusData,
                datasets: [{
                  ...paymentStatusData.datasets[0],
                  backgroundColor: [
                    '#0ea5e9', // Sky blue 500
                    '#0284c7', // Sky blue 600
                    '#0369a1', // Sky blue 700
                    '#075985', // Sky blue 800
                    '#0c4a6e', // Sky blue 900
                  ],
                }],
              }}
              options={{
                ...doughnutOptions,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* Bottom Row - Payment Trends */}
        <div className="lg:col-span-8 bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
          <h3 className="text-sm font-semibold mb-4 text-tertiary">Payment Trends</h3>
          <div className="w-full h-[300px]">
            <Line 
              data={{
                ...paymentTrendsData,
                datasets: paymentTrendsData.datasets.map((dataset, index) => ({
                  ...dataset,
                  borderColor: Object.values(strandColors)[index],
                  backgroundColor: Object.values(strandColors)[index] + '20',
                })),
              }}
              options={{
                ...barChartOptions,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* Bottom Right - Performance Metrics */}
        <div className="lg:col-span-4 bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
          <h3 className="text-sm font-semibold mb-4 text-tertiary">Performance Metrics</h3>
          <div className="w-full h-[300px]">
            <Radar 
              data={performanceData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                    min: 0,
                    ticks: { 
                      stepSize: 20,
                      showLabelBackdrop: false,
                      font: {
                        size: 10,
                      },
                    },
                    grid: { 
                      color: '#e2e8f0',
                      lineWidth: 1,
                    },
                    angleLines: { 
                      color: '#e2e8f0',
                      lineWidth: 1,
                    },
                    pointLabels: {
                      font: {
                        size: 11,
                        weight: '500',
                      },
                      padding: 10,
                      color: '#0369a1',
                      centerPointLabels: true,
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 12,
                      padding: 15,
                      font: { 
                        size: 11,
                        weight: '500',
                      },
                      color: '#0369a1',
                    },
                  },
                  tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#0369a1',
                    bodyColor: '#0369a1',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 5,
                    usePointStyle: true,
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.r}%`;
                      }
                    }
                  }
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Unpaid Students Table */}
      <div className="bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-4 text-tertiary">Recent Unpaid Students</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sky-100">
              <thead>
                <tr>
                  <th className="px-1 py-1 text-left text-[8px] sm:text-[10px] font-medium text-gray-500 uppercase">
                    Student
                  </th>
                  <th className="px-1 py-1 text-left text-[8px] sm:text-[10px] font-medium text-gray-500 uppercase">
                    Grade & Strand
                  </th>
                  <th className="px-1 py-1 text-left text-[8px] sm:text-[10px] font-medium text-gray-500 uppercase">
                    Balance
                  </th>
                  <th className="px-1 py-1 text-left text-[8px] sm:text-[10px] font-medium text-gray-500 uppercase">
                    Due Date
                  </th>
                  <th className="px-1 py-1 text-left text-[8px] sm:text-[10px] font-medium text-gray-500 uppercase">
                    Days Overdue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    student: 'John Doe',
                    gradeStrand: 'Grade 11 - STEM',
                    balance: '₱15,000',
                    dueDate: '2024-03-15',
                    daysOverdue: 5,
                  },
                  {
                    student: 'Jane Smith',
                    gradeStrand: 'Grade 12 - ABM',
                    balance: '₱12,000',
                    dueDate: '2024-03-14',
                    daysOverdue: 6,
                  },
                  {
                    student: 'Bob Johnson',
                    gradeStrand: 'Grade 11 - ICT',
                    balance: '₱18,000',
                    dueDate: '2024-03-13',
                    daysOverdue: 7,
                  },
                ].map((student, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-1 py-1 whitespace-nowrap text-[8px] sm:text-[10px]">
                      {student.student}
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-[8px] sm:text-[10px]">
                      {student.gradeStrand}
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-[8px] sm:text-[10px]">
                      {student.balance}
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-[8px] sm:text-[10px]">
                      {student.dueDate}
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-[8px] sm:text-[10px]">
                      <span className="px-1 inline-flex text-[8px] sm:text-[10px] leading-4 font-medium rounded-full bg-red-100 text-red-800">
                        {student.daysOverdue} days
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

export default Overview 