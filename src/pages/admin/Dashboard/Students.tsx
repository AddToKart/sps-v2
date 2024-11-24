import { useState } from 'react'
import { FiChevronDown, FiUsers } from 'react-icons/fi'

type Grade = '11' | '12'
type Strand = 'STEM' | 'ABM' | 'ICT'
type Section = 'A' | 'B'

interface StudentData {
  id: string
  name: string
  email: string
  status: 'Active' | 'Inactive'
  balance: number
}

function Students() {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null)
  const [selectedStrand, setSelectedStrand] = useState<Strand | null>(null)
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)

  // Structure data
  const grades: Grade[] = ['11', '12']
  const strands: Strand[] = ['STEM', 'ABM', 'ICT']
  const sections: Section[] = ['A', 'B']

  // Dummy student data
  const students: StudentData[] = [
    { id: '001', name: 'John Doe', email: 'john@example.com', status: 'Active', balance: 15000 },
    { id: '002', name: 'Jane Smith', email: 'jane@example.com', status: 'Active', balance: 0 },
    { id: '003', name: 'Bob Wilson', email: 'bob@example.com', status: 'Inactive', balance: 5000 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary">
          Add Student
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold mb-4">Filter Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Grade Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
            <select
              value={selectedGrade || ''}
              onChange={(e) => setSelectedGrade(e.target.value as Grade)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
          </div>

          {/* Strand Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Strand</label>
            <select
              value={selectedStrand || ''}
              onChange={(e) => setSelectedStrand(e.target.value as Strand)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Select Strand</option>
              {strands.map((strand) => (
                <option key={strand} value={strand}>
                  {strand}
                </option>
              ))}
            </select>
          </div>

          {/* Section Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              value={selectedSection || ''}
              onChange={(e) => setSelectedSection(e.target.value as Section)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  Section {section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {selectedGrade && selectedStrand && selectedSection
                ? `Grade ${selectedGrade} - ${selectedStrand} - Section ${selectedSection}`
                : 'All Students'}
            </h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search students..."
                className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱{student.balance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-primary hover:text-secondary">Edit</button>
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