import React, { useState, useEffect } from 'react';
import { useUserStore } from '../context/useUserStore';
import { getUserProfile, getUserRole, getWalletAddress } from '../services/data';
import { 
  User, 
  Wallet, 
  Award, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Database,
  Shield,
  Copy,
  ExternalLink,
  Settings,
  Bell,
  Eye,
  Download
} from 'lucide-react';

const Profile = () => {
  const { principal, role, isAuthenticated } = useUserStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockProfile = {
        name: 'Environmental Researcher',
        points: 1500,
        wallet: principal,
        role: role,
        joinDate: '2023-08-15',
        submissionsCount: 25,
        approvedSubmissions: 20,
        tokensEarned: 1500,
        level: 'Gold Contributor',
        nextLevelPoints: 2000,
        badges: ['Early Adopter', 'Data Validator', 'Community Helper'],
        recentSubmissions: [
          { id: 12345, date: '2023-08-15', status: 'Approved', type: 'Air Quality' },
          { id: 67890, date: '2023-08-10', status: 'Pending', type: 'Water Quality' },
          { id: 11223, date: '2023-08-05', status: 'Rejected', type: 'Soil Health' },
          { id: 44556, date: '2023-07-30', status: 'Approved', type: 'Biodiversity' },
          { id: 77889, date: '2023-07-25', status: 'Pending', type: 'Air Quality' }
        ],
        votingHistory: [
          { submissionId: 12345, date: '2023-08-16', voted: true },
          { submissionId: 67890, date: '2023-08-11', voted: true },
          { submissionId: 11223, date: '2023-08-06', voted: false }
        ]
      };
      setProfile(mockProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-green-400 bg-green-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'rejected':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const progressPercentage = profile ? (profile.points / profile.nextLevelPoints) * 100 : 0;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Please connect your wallet to view your profile</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Account</h1>
              <p className="text-gray-300">View your submissions, tokens earned, and history.</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wallet className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Wallet Address</p>
              <p className="font-mono text-white">{principal}</p>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(principal)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Submissions Made</h3>
            <Database className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{profile?.submissionsCount}</div>
          <p className="text-sm text-gray-400">Total data submissions</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Approved Submissions</h3>
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{profile?.approvedSubmissions}</div>
          <p className="text-sm text-gray-400">Successfully validated</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Tokens Earned</h3>
            <Award className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{profile?.tokensEarned}</div>
          <p className="text-sm text-gray-400">ECO tokens earned</p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Current Level</h3>
            <p className="text-green-400 font-medium">{profile?.level}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Progress to next level</p>
            <p className="text-white font-semibold">{profile?.points} / {profile?.nextLevelPoints}</p>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'text-green-400 border-b-2 border-green-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'submissions' 
                ? 'text-green-400 border-b-2 border-green-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Submission History
          </button>
          <button
            onClick={() => setActiveTab('voting')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'voting' 
                ? 'text-green-400 border-b-2 border-green-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Voting History
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Badges */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Achievements</h4>
                <div className="flex flex-wrap gap-2">
                  {profile?.badges.map((badge, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-green-400/20 to-green-600/20 text-green-400 rounded-full text-sm font-medium border border-green-400/30"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {profile?.recentSubmissions.slice(0, 3).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(submission.status)}
                        <div>
                          <p className="text-white font-medium">#{submission.id}</p>
                          <p className="text-sm text-gray-400">{submission.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{submission.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">Submission History</h4>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Submission ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile?.recentSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-3 text-white font-mono">#{submission.id}</td>
                        <td className="px-4 py-3 text-gray-300">{submission.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-300">{submission.type}</td>
                        <td className="px-4 py-3">
                          <button className="text-green-400 hover:text-green-300 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'voting' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Voting History</h4>
              <div className="space-y-3">
                {profile?.votingHistory.map((vote, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {vote.voted ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <div>
                        <p className="text-white font-medium">Submission #{vote.submissionId}</p>
                        <p className="text-sm text-gray-400">{vote.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vote.voted 
                        ? 'text-green-400 bg-green-400/20' 
                        : 'text-red-400 bg-red-400/20'
                    }`}>
                      {vote.voted ? 'Approved' : 'Rejected'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Claim Token Button */}
      <div className="bg-gradient-to-r from-green-600/20 to-green-400/20 backdrop-blur-sm rounded-xl p-6 border border-green-400/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Ready to Claim</h3>
            <p className="text-gray-300">You have earned tokens ready to be claimed</p>
          </div>
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-green-500/25">
            Claim Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;