import React, { useState } from 'react';
import { User, Shield, Crown, ChevronRight, Check, AlertCircle } from 'lucide-react';

const RoleSelectionModal = ({ isOpen, onClose, onRoleSelect, loading }) => {
  const [selectedRole, setSelectedRole] = useState('User');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const roles = [
    {
      value: 'User',
      label: 'User',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500',
      description: 'Submit environmental data and explore the platform',
      permissions: [
        'Submit environmental data',
        'View validated data',
        'Access personal profile',
        'Participate in community discussions'
      ]
    },
    {
      value: 'Validator',
      label: 'Validator',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      borderColor: 'border-green-500',
      description: 'Validate data submissions and help maintain data quality',
      permissions: [
        'All User permissions',
        'Validate data submissions',
        'Access validation dashboard',
        'Vote on data quality',
        'Earn validation rewards'
      ]
    }
  ];

  const handleConfirmRole = async () => {
    if (onRoleSelect) {
      await onRoleSelect(selectedRole);
    }
  };

  const selectedRoleData = roles.find(role => role.value === selectedRole);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {!showConfirmation ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Role</h2>
              <p className="text-gray-400">
                Select how you'd like to participate in the EcoChain ecosystem
              </p>
            </div>

            {/* Role Options */}
            <div className="p-6 space-y-4">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-[1.02] ${
                    selectedRole === role.value
                      ? `${role.borderColor} bg-gradient-to-r ${role.color}/10`
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0`}>
                      <role.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">{role.label}</h3>
                        {selectedRole === role.value && (
                          <Check className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <p className="text-gray-400 mt-1">{role.description}</p>
                      <div className="mt-3 space-y-1">
                        {role.permissions.map((permission, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <span className="text-sm text-gray-300">{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Info Note */}
            <div className="mx-6 mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-300 font-medium">Note about Admin Role</p>
                  <p className="text-sm text-yellow-200 mt-1">
                    Admin roles are assigned by existing administrators. If you need admin access, 
                    please contact the system administrator after registration.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-800 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirmation(true)}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Confirmation Screen */}
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-2">Confirm Your Selection</h2>
              <p className="text-gray-400">
                Please confirm your role selection to complete registration
              </p>
            </div>

            <div className="p-6">
              <div className={`p-6 rounded-xl border-2 ${selectedRoleData.borderColor} bg-gradient-to-r ${selectedRoleData.color}/10`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedRoleData.color} flex items-center justify-center`}>
                    <selectedRoleData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedRoleData.label}</h3>
                    <p className="text-gray-400">{selectedRoleData.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">Your permissions will include:</p>
                  {selectedRoleData.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-300 font-medium">Role Changes</p>
                    <p className="text-sm text-blue-200 mt-1">
                      You can request role changes later through system administrators, 
                      but initial selection helps us customize your experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Buttons */}
            <div className="p-6 border-t border-gray-800 flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                disabled={loading}
              >
                Back
              </button>
              <button
                onClick={handleConfirmRole}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoleSelectionModal;