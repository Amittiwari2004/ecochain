import React, { useState, useEffect } from 'react';
import { useUserStore } from '../context/useUserStore';
import { promoteUserRole, getUserProfile } from '../services/api';
import { 
  Shield, 
  User, 
  Crown, 
  Search, 
  Check, 
  X, 
  AlertCircle,
  Users,
  ChevronDown
} from 'lucide-react';

const AssignRole = () => {
  const { isAdmin, principal } = useUserStore();
  const [userPrincipal, setUserPrincipal] = useState('');
  const [selectedRole, setSelectedRole] = useState('User');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin()) {
      window.location.href = '/';
    }
  }, [isAdmin]);

  const roles = [
    { 
      value: 'User', 
      label: 'User', 
      icon: User, 
      color: 'text-blue-400',
      description: 'Can submit data and view content'
    },
    { 
      value: 'Validator', 
      label: 'Validator', 
      icon: Shield, 
      color: 'text-green-400',
      description: 'Can validate data submissions'
    },
    { 
      value: 'Admin', 
      label: 'Admin', 
      icon: Crown, 
      color: 'text-purple-400',
      description: 'Full system access and user management'
    }
  ];

  const handleRoleAssignment = async (e) => {
    e.preventDefault();
    
    if (!userPrincipal.trim()) {
      setMessage({ type: 'error', text: 'Please enter a valid user principal ID' });
      return;
    }

    if (userPrincipal === principal) {
      setMessage({ type: 'error', text: 'You cannot change your own role' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Convert role string to backend format
      const roleMapping = {
        'User': { User: null },
        'Validator': { Validator: null },
        'Admin': { Admin: null }
      };

      await promoteUserRole(userPrincipal, roleMapping[selectedRole]);
      
      setMessage({ 
        type: 'success', 
        text: `Successfully assigned ${selectedRole} role to user ${userPrincipal.slice(0, 8)}...${userPrincipal.slice(-4)}` 
      });
      
      setUserPrincipal('');
      setSelectedRole('User');
      
    } catch (error) {
      console.error('Error assigning role:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to assign role. Please check the user principal ID and try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrincipalSearch = (value) => {
    setUserPrincipal(value);
    // Here you could implement actual user search functionality
    // For now, we'll just clear the message when user starts typing
    if (message.type === 'error') {
      setMessage({ type: '', text: '' });
    }
  };

  const getRoleIcon = (role) => {
    const roleData = roles.find(r => r.value === role);
    return roleData ? roleData.icon : User;
  };

  const getRoleColor = (role) => {
    const roleData = roles.find(r => r.value === role);
    return roleData ? roleData.color : 'text-gray-400';
  };

  if (!isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Role Management</h1>
                <p className="text-gray-400">Assign roles to users in the EcoChain system</p>
              </div>
            </div>
          </div>

          {/* Role Assignment Form */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Assign User Role
            </h2>

            <form onSubmit={handleRoleAssignment} className="space-y-6">
              {/* User Principal Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  User Principal ID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={userPrincipal}
                    onChange={(e) => handlePrincipalSearch(e.target.value)}
                    placeholder="Enter user's principal ID..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter the complete principal ID of the user you want to assign a role to
                </p>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Role
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {React.createElement(getRoleIcon(selectedRole), { 
                        className: `w-4 h-4 ${getRoleColor(selectedRole)}` 
                      })}
                      <span>{selectedRole}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                      {roles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => {
                            setSelectedRole(role.value);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left"
                        >
                          <role.icon className={`w-4 h-4 ${role.color}`} />
                          <div>
                            <p className="text-white font-medium">{role.label}</p>
                            <p className="text-xs text-gray-400">{role.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !userPrincipal.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Assigning Role...</span>
                  </div>
                ) : (
                  'Assign Role'
                )}
              </button>
            </form>

            {/* Message Display */}
            {message.text && (
              <div className={`mt-4 p-4 rounded-lg flex items-center space-x-2 ${
                message.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-red-500/20 border border-red-500/30'
              }`}>
                {message.type === 'success' ? (
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                )}
                <p className={`text-sm ${
                  message.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {message.text}
                </p>
              </div>
            )}
          </div>

          {/* Role Information */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Role Permissions</h3>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.value} className="flex items-start space-x-3">
                  <role.icon className={`w-5 h-5 ${role.color} mt-0.5`} />
                  <div>
                    <h4 className="font-medium text-white">{role.label}</h4>
                    <p className="text-sm text-gray-400">{role.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {role.value === 'User' && (
                        <>
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">Submit Data</span>
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">View Content</span>
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">Profile Access</span>
                        </>
                      )}
                      {role.value === 'Validator' && (
                        <>
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">Validate Data</span>
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">Dashboard Access</span>
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">All User Permissions</span>
                        </>
                      )}
                      {role.value === 'Admin' && (
                        <>
                          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">Full System Access</span>
                          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">User Management</span>
                          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">Role Assignment</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignRole;