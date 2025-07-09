import { useState } from "react";
import { submitData } from "../services/data";
import image2 from '../images/image1.png'

const SubmitData = () => {
  const [formData, setFormData] = useState({
    location: "",
    dataType: "",
    dataValue: "",
    timestamp: "",
    description: ""
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const dataTypes = [
    "Air Quality",
    "Water Quality", 
    "Soil Health",
    "Biodiversity",
    "Waste Management",
    "Deforestation",
    "Temperature",
    "Humidity",
    "Pollution Level"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      // Validate required fields
      if (!formData.location || !formData.dataType || !formData.dataValue) {
        setStatus("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      // Create submission object
      const submission = {
        location: formData.location,
        dataType: formData.dataType,
        dataValue: formData.dataValue,
        timestamp: formData.timestamp || new Date().toISOString(),
        description: formData.description
      };

      await submitData(JSON.stringify(submission));
      setStatus("Data submitted successfully!");
      
      // Reset form
      setFormData({
        location: "",
        dataType: "",
        dataValue: "",
        timestamp: "",
        description: ""
      });
    } catch (error) {
      console.error("Submit Error:", error);
      setStatus("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Submit Environmental Data</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              {/* Data Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Data Type *</label>
                <select
                  name="dataType"
                  value={formData.dataType}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                  required
                >
                  <option value="">Select data type</option>
                  {dataTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Data Value */}
              <div>
                <label className="block text-sm font-medium mb-2">Data Value *</label>
                <input
                  type="text"
                  name="dataValue"
                  value={formData.dataValue}
                  onChange={handleChange}
                  placeholder="Enter data value"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              {/* Timestamp */}
              <div>
                <label className="block text-sm font-medium mb-2">Timestamp</label>
                <input
                  type="datetime-local"
                  name="timestamp"
                  value={formData.timestamp}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Additional details about your data submission..."
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>

              {/* Status Message */}
              {status && (
                <div className={`p-4 rounded-lg ${
                  status.includes("successfully") 
                    ? "bg-green-800 border border-green-600 text-green-200" 
                    : "bg-red-800 border border-red-600 text-red-200"
                }`}>
                  {status}
                </div>
              )}
            </form>
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
              <img 
                src={image2}
                alt="Environmental Data Submission" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Your Data Matters</h3>
                <p className="text-gray-400">
                  Every environmental data point you contribute helps build a more sustainable future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitData;