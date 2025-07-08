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
  const [newProposal, setNewProposal] = useState({ title: "", description: "" });

  const loadData = async () => {
    const data = await getPendingData();
    const props = await getProposals();
    setPending(data);
    setProposals(props);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVote = async (id, approve) => {
    await voteOnData(id, approve);
    await loadData();
  };

  const handleProposalSubmit = async () => {
    await createProposal(newProposal.title, newProposal.description);
    setNewProposal({ title: "", description: "" });
    await loadData();
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Pending Data Validation</h2>
        {pending.map((item, idx) => (
          <div key={idx} className="p-4 bg-gray-800 rounded mb-2">
            <p>{item.content}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleVote(item.id, true)}
                className="bg-green-600 px-4 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleVote(item.id, false)}
                className="bg-red-600 px-4 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Proposals</h2>
        {proposals.map((p, idx) => (
          <div key={idx} className="bg-gray-700 p-3 rounded mb-2">
            <h4 className="font-bold">{p.title}</h4>
            <p className="text-sm">{p.description}</p>
          </div>
        ))}

        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Create Proposal</h3>
          <input
            className="w-full mb-2 p-2 bg-gray-900 border border-gray-700 rounded"
            placeholder="Title"
            value={newProposal.title}
            onChange={(e) =>
              setNewProposal((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <textarea
            className="w-full mb-2 p-2 bg-gray-900 border border-gray-700 rounded"
            rows={3}
            placeholder="Description"
            value={newProposal.description}
            onChange={(e) =>
              setNewProposal((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>
          <button
            onClick={handleProposalSubmit}
            className="bg-blue-600 px-4 py-1 rounded"
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default DaoDashboard;
