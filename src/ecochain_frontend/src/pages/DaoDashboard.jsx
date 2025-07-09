import { useEffect, useState } from "react";
import {
  getPendingData,
  voteOnData,
  getProposals,
  createProposal,
} from "../services/data";

const DaoDashboard = () => {
  const [pending, setPending] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [newProposal, setNewProposal] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [approvalRate, setApprovalRate] = useState(60);

  const loadData = async () => {
    try {
      const [pendingData, proposalsData] = await Promise.all([
        getPendingData(),
        getProposals()
      ]);
      
      setPending(pendingData);
      setProposals(proposalsData);
      
      // Mock rewards data
      setRewards([
        { contributor: "Liam Bennett", tokens: "150 ECT", date: "2024-07-26" },
        { contributor: "Olivia Carter", tokens: "120 ECT", date: "2024-07-26" },
        { contributor: "Noah Thompson", tokens: "100 ECT", date: "2024-07-26" }
      ]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVote = async (id, approve) => {
    try {
      setLoading(true);
      await voteOnData(id, approve);
      await loadData();
    } catch (error) {
      console.error("Vote error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProposalSubmit = async () => {
    if (!newProposal.title.trim() || !newProposal.description.trim()) {
      alert("Please fill in both title and description");
      return;
    }

    try {
      setLoading(true);
      await createProposal(newProposal.title, newProposal.description);
      setNewProposal({ title: "", description: "" });
      await loadData();
    } catch (error) {
      console.error("Create proposal error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    // Mock time formatting
    return "2 hours ago";
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium transition-colors ${
        isActive 
          ? "text-white border-b-2 border-green-500" 
          : "text-gray-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Tab Navigation */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            <TabButton
              id="pending"
              label="Pending Submissions"
              isActive={activeTab === "pending"}
              onClick={() => setActiveTab("pending")}
            />
            <TabButton
              id="rewards"
              label="Rewards Issued"
              isActive={activeTab === "rewards"}
              onClick={() => setActiveTab("rewards")}
            />
            <TabButton
              id="proposals"
              label="DAO Proposals"
              isActive={activeTab === "proposals"}
              onClick={() => setActiveTab("proposals")}
            />
          </nav>
        </div>

        {/* Pending Submissions Tab */}
        {activeTab === "pending" && (
          <div className="space-y-6">
            {/* Approval Rate */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Approvals</h3>
                <span className="text-2xl font-bold text-green-400">{approvalRate}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${approvalRate}%` }}
                ></div>
              </div>
            </div>

            {/* Pending Data Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left p-4">Contributor</th>
                    <th className="text-left p-4">Location</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Value</th>
                    <th className="text-left p-4">Time</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-700">
                      <td className="p-4">{item.contributor || "Anonymous"}</td>
                      <td className="p-4">{item.location || "Unknown"}</td>
                      <td className="p-4">{item.type || "Data"}</td>
                      <td className="p-4">{item.value || item.content}</td>
                      <td className="p-4">{formatTime(item.timestamp)}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleVote(item.id, true)}
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleVote(item.id, false)}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pending.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  No pending submissions at this time.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === "rewards" && (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left p-4">Contributor</th>
                  <th className="text-left p-4">Tokens</th>
                  <th className="text-left p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((reward, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="p-4">{reward.contributor}</td>
                    <td className="p-4 text-green-400 font-medium">{reward.tokens}</td>
                    <td className="p-4">{reward.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Proposals Tab */}
        {activeTab === "proposals" && (
          <div className="space-y-6">
            {/* Existing Proposals */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left p-4">Proposal</th>
                    <th className="text-left p-4">Votes</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.map((proposal, idx) => (
                    <tr key={idx} className="border-b border-gray-700">
                      <td className="p-4">
                        <div>
                          <h4 className="font-semibold">{proposal.title}</h4>
                          <p className="text-sm text-gray-400">{proposal.description}</p>
                        </div>
                      </td>
                      <td className="p-4">{proposal.votes || "120/200"}</td>
                      <td className="p-4">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                          {proposal.status || "Open"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Create New Proposal */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Create New Proposal</h3>
                <button
                  onClick={handleProposalSubmit}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded font-medium transition-colors flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "+ Create Proposal"
                  )}
                </button>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Proposal title"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                />
                <textarea
                  placeholder="Proposal description"
                  value={newProposal.description}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaoDashboard;