import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../context/useUserStore';
import { login, logout } from '../services/auth';
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  LogOut, 
  Settings,
  Database,
  Shield,
  Plus,
  Home,
  Leaf,
  LayoutDashboard,
  Crown,
  UserCog
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { principal, role, isAuthenticated, isLoading, isAdmin, isValidator } = useUserStore();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Role-based navigation items
  const getNavigationItems = () => {
    const baseItems = [
      { path: '/', label: 'Home', icon: Home, roles: ['User', 'Validator', 'Admin'] },
      { path: '/explore', label: 'Explore', icon: Database, roles: ['User', 'Validator', 'Admin'] },
    ];

    const roleSpecificItems = [
      { path: '/submit', label: 'Submit Data', icon: Plus, roles: ['User', 'Validator', 'Admin'] },
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Validator', 'Admin'] },
    ];

    const allItems = [...baseItems, ...roleSpecificItems];

    // Filter items based on current user role
    return allItems.filter(item => 
      !isAuthenticated || item.roles.includes(role)
    );
  };

  const navItems = getNavigationItems();

  const isActivePath = (path) => location.pathname === path;

  const getRoleColor = (userRole) => {
    switch (userRole) {
      case 'Admin':
        return 'text-purple-400';
      case 'Validator':
        return 'text-green-400';
      case 'User':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRoleIcon = (userRole) => {
    switch (userRole) {
      case 'Admin':
        return Crown;
      case 'Validator':
        return Shield;
      case 'User':
        return User;
      default:
        return User;
    }
  };

  const RoleIcon = getRoleIcon(role);

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
              EcoChain
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActivePath(path)
                    ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search environmental data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {isAuthenticated && (
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
              </button>
            )}

            {/* User Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    role === 'Admin' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                    role === 'Validator' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                    'bg-gradient-to-br from-blue-500 to-blue-600'
                  }`}>
                    <RoleIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white truncate max-w-32">
                      {principal?.slice(0, 8)}...{principal?.slice(-4)}
                    </p>
                    <p className={`text-xs ${getRoleColor(role)}`}>{role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">Signed in as</p>
                      <p className="text-xs text-gray-400 truncate">{principal}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <RoleIcon className={`w-3 h-3 ${getRoleColor(role)}`} />
                        <span className={`text-xs ${getRoleColor(role)}`}>{role}</span>
                      </div>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>

                    {/* Admin-only menu items */}
                    {isAdmin() && (
                      <Link
                        to="/assign-role"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <UserCog className="w-4 h-4" />
                        <span>Assign Roles</span>
                      </Link>
                    )}

                    {/* Validator+ menu items */}
                    {isValidator() && (
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    
                    <button
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full text-left"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    
                    <div className="border-t border-gray-700 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 disabled:opacity-50"
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;