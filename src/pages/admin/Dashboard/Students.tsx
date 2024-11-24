import { useState } from 'react'
import { FiUsers, FiSearch, FiFilter, FiDownload, FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'

interface Student {
  id: string
  name: string
  course: string
  section: string
  status: 'Active' | 'Inactive' | 'Graduated'
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid'
  email: string
  phone: string
  enrollmentDate: string
}

function Students() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // Add new filter states
  const [selectedGrade, setSelectedGrade] = useState<string>('all')
  const [selectedStrand, setSelectedStrand] = useState<string>('all')
  const [selectedSection, setSelectedSection] = useState<string>('all')

  // Filter options
  const grades = ['11', '12']
  const strands = ['STEM', 'ABM', 'ICT']
  const sections = ['A', 'B', 'C']

  // Dummy students data
  const students: Student[] = [
    {
      id: 'STD-2024-001',
      name: 'John Doe',
      course: 'Grade 11 - STEM',
      section: 'A',
      status: 'Active',
      paymentStatus: 'Paid',
      email: 'john.doe@student.sps.edu',
      phone: '+63 912 345 6789',
      enrollmentDate: '2024-01-15'
    },
    // ... more student records
  ]

  return (
    <div className="w-full p-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-tertiary">Student Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Add Student
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-surface p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FiUsers className="w-5 h-5 text-primary" />
              <span className="text-xs text-emerald-500">Active</span>
            </div>
            <h3 className="text-sm text-gray-500">Total Students</h3>
            <p className="text-lg font-bold text-tertiary">1,234</p>
          </div>
          
          <div className="bg-surface p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FiUsers className="w-5 h-5 text-primary" />
              <span className="text-xs text-rose-500">Unpaid</span>
            </div>
            <h3 className="text-sm text-gray-500">With Balance</h3>
            <p className="text-lg font-bold text-tertiary">234</p>
          </div>

          <div className="bg-surface p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FiUsers className="w-5 h-5 text-primary" />
              <span className="text-xs text-blue-500">New</span>
            </div>
            <h3 className="text-sm text-gray-500">New Enrollees</h3>
            <p className="text-lg font-bold text-tertiary">45</p>
          </div>

          <div className="bg-surface p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FiUsers className="w-5 h-5 text-primary" />
              <span className="text-xs text-gray-500">Inactive</span>
            </div>
            <h3 className="text-sm text-gray-500">Inactive Students</h3>
            <p className="text-lg font-bold text-tertiary">12</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-surface p-4 rounded-lg shadow-sm mb-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Academic Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade Level
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="all">All Grades</option>
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>Grade {grade}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Strand
                </label>
                <select
                  value={selectedStrand}
                  onChange={(e) => setSelectedStrand(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="all">All Strands</option>
                  {strands.map((strand) => (
                    <option key={strand} value={strand}>{strand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="all">All Sections</option>
                  {sections.map((section) => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>

              {/* Status Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="unpaid">With Balance</option>
                  <option value="new">New Enrollees</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-2 flex items-end space-x-2">
                <button className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-center">
                    <FiFilter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </div>
                </button>
                <button className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-center">
                    <FiDownload className="w-4 h-4 mr-2" />
                    Export
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{student.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{student.course}</div>
                        <div className="text-sm text-gray-500">Section {student.section}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'Active' 
                          ? 'bg-green-100 text-green-800'
                          : student.status === 'Inactive'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.paymentStatus === 'Paid' 
                          ? 'bg-green-100 text-green-800'
                          : student.paymentStatus === 'Partial'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedStudent(student)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button className="text-primary hover:text-secondary">
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
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

export default Students 