import { useState } from 'react'
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi'

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  
  // Dummy admin data
  const adminData = {
    name: 'Admin User',
    email: 'admin@sps.edu',
    phone: '+63 912 345 6789',
    role: 'System Administrator',
    lastLogin: '2024-03-21 09:30 AM',
    accountCreated: '2024-01-01'
  }

  return (
    <div className="w-full p-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-6 text-tertiary">Profile Settings</h1>
        
        {/* Profile Header */}
        <div className="bg-surface rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <FiUser className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-tertiary">{adminData.name}</h2>
              <p className="text-sm text-gray-500">{adminData.role}</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-surface rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-tertiary">Personal Information</h3>
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
                  defaultValue={adminData.name}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={adminData.email}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue={adminData.phone}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  defaultValue={adminData.role}
                  disabled
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-surface rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-tertiary">Security</h3>
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