import { useEffect, useState } from "react";
import { getValidatedData } from "../services/data";

const ExploreData = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getValidatedData();
        setEntries(data);
      } catch (err) {
        console.error("Error fetching validated data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-2">Explore Validated Data</h2>
      {entries.map((entry, index) => (
        <div key={index} className="p-4 bg-gray-800 rounded shadow">
          <p>{entry.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ExploreData;
