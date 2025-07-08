import { useState } from "react";
import { submitData } from "../services/data";

const SubmitData = () => {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      await submitData(content);
      setStatus("Data submitted successfully!");
      setContent("");
    } catch (error) {
      console.error("Submit Error:", error);
      setStatus("Failed to submit data.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit Environmental Data</h2>
      <textarea
        className="w-full p-4 rounded bg-gray-800 border border-gray-700 text-white"
        rows={6}
        placeholder="Enter your data here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
};

export default SubmitData;
