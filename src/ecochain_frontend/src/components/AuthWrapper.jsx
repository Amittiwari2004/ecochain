import React, { useState, useEffect } from 'react';
import { useUserStore } from '../context/useUserStore';
import { registerUserWithRole, createAdminUser } from '../services/auth';
import RoleSelectionModal from './RoleSelectionModal';
import { Crown, AlertCircle } from 'lucide-react';

const AuthWrapper = ({ children }) => {
  const { shouldShowRoleSelection, isAuthenticated, principal, role } = useUserStore();
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showAdminSetup, setShowAdminSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if role selection is needed when authentication state changes
  useEffect(() => {
    if (shouldShowRoleSelection()) {
      setShowRoleSelection(true);
    }
  }, [shouldShowRoleSelection]);

  // Handle role selection
  const handleRoleSelect = async (selectedRole) => {
    setLoading(true);
    setError('');

    try {
      // Check if user selected Admin role but no admin exists
      if (selectedRole === 'Admin') {
        // Show admin setup modal instead
        setShowRoleSelection(false);
        setShowAdminSetup(true);
        setLoading(false);
        return;
      }

      const result = await registerUserWithRole(selectedRole);
      
      if (result.success) {
        setShowRoleSelection(false);
        useUserStore.getState().completeRoleSelection(selectedRole);
      } else {
        setError(result.error || 'Failed to register with selected role');
      }
    } catch (error) {
      console.error('Error during role selection:', error);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle admin setup
  const handleAdminSetup = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await createAdminUser();
      
      if (result.success) {
        setShowAdminSetup(false);
        useUserStore.getState().completeRoleSelection('Admin');
      } else {
        setError(result.error || 'Failed to create admin user');
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
      setError('An error occurred during admin setup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseRoleSelection = () => {
    // Log out the user if they close the role selection modal
    useUserStore.getState().clearUser();
    setShowRoleSelection(false);
  };

  const handleCloseAdminSetup = () => {
    setShowAdminSetup(false);
    setShowRoleSelection(true);
  };

  return (
    <>
      {children}
      
      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={showRoleSelection}
        onClose={handleCloseRoleSelection}
        onRoleSelect={handleRoleSelect}
        loading={loading}
        error={error}
      />

      {/* Admin Setup Modal */}
      {showAdminSetup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-md w-full">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Admin Setup</h2>
              </div>
              <p className="text-gray-400">
                No admin users exist. Would you like to become the first administrator?
              </p>
            </div>

            <div className="p-6">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-purple-300 font-medium">Admin Privileges</p>
                    <p className="text-sm text-purple-200 mt-1">
                      As an admin, you'll have full system access including user management, 
                      role assignment, and system configuration.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={handleCloseAdminSetup}
                  className="flex-1 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  disabled={loading}
                >
                  Choose Different Role
                </button>
                <button
                  onClick={handleAdminSetup}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Setting up...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4" />
                      <span>Become Admin</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthWrapper;