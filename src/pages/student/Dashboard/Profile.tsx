import { useState } from 'react'
import { FiUser, FiMail, FiPhone, FiLock, FiBook } from 'react-icons/fi'

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  
  // Dummy student data
  const studentData = {
    name: 'John Doe',
    email: 'student@sps.edu',
    phone: '+63 912 345 6789',
    studentId: 'STD-2024-001',
    course: 'Grade 11 - STEM',
    section: 'A',
    enrollmentDate: '2024-01-15',
    guardian: {
      name: 'Jane Doe',
      relationship: 'Mother',
      phone: '+63 912 345 6788'
    }
  }

  return (
    <div className="w-full p-4 bg-background dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-6 text-tertiary dark:text-white">Student Profile</h1>
        
        {/* Profile Header */}
        <div className="bg-surface dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <FiUser className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-tertiary dark:text-white">{studentData.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{studentData.studentId}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{studentData.course}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-surface dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-tertiary dark:text-white">Personal Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary hover:text-secondary"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={studentData.name}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 
                  focus:outline-none focus:ring-primary focus:border-primary 
                  disabled:bg-gray-50 dark:disabled:bg-gray-700
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={studentData.email}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 
                  focus:outline-none focus:ring-primary focus:border-primary 
                  disabled:bg-gray-50 dark:disabled:bg-gray-700
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue={studentData.phone}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 
                  focus:outline-none focus:ring-primary focus:border-primary 
                  disabled:bg-gray-50 dark:disabled:bg-gray-700
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                <input
                  type="text"
                  defaultValue={studentData.studentId}
                  disabled
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-surface dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-tertiary dark:text-white">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <input
                type="text"
                defaultValue={studentData.course}
                disabled
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <input
                type="text"
                defaultValue={studentData.section}
                disabled
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Guardian Information */}
        <div className="bg-surface dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-tertiary dark:text-white">Guardian Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
              <input
                type="text"
                defaultValue={studentData.guardian.name}
                disabled={!isEditing}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 
                focus:outline-none focus:ring-primary focus:border-primary 
                disabled:bg-gray-50 dark:disabled:bg-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
              <input
                type="text"
                defaultValue={studentData.guardian.relationship}
                disabled={!isEditing}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 
                focus:outline-none focus:ring-primary focus:border-primary 
                disabled:bg-gray-50 dark:disabled:bg-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone</label>
              <input
                type="tel"
                defaultValue={studentData.guardian.phone}
                disabled={!isEditing}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 
                focus:outline-none focus:ring-primary focus:border-primary 
                disabled:bg-gray-50 dark:disabled:bg-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-surface dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-tertiary dark:text-white">Security</h3>
          <button className="flex items-center text-primary hover:text-secondary">
            <FiLock className="w-4 h-4 mr-2" />
            Change Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile 