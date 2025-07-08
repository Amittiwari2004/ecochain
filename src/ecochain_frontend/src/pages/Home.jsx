import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-96 bg-center bg-cover rounded-lg" style={{ backgroundImage: 'url("")' }}>
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Powering Environmental Change</h1>
          <div className="space-x-4">
            <button onClick={() => nav("/submit")} className="btn-green">Contribute Data</button>
            <button onClick={() => nav("/dao")} className="btn-outline">Explore DAO</button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-3 gap-6">
        <Stat title="Total Submissions" value="12,345" />
        <Stat title="Tokens Distributed" value="67,890" />
        <Stat title="DAO Members" value="4,567" />
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <ul className="space-y-2 list-disc pl-6">
          <li>Contribute data to support environmental research.</li>
          <li>Validators review submissions via DAO voting.</li>
          <li>Earn ECO tokens for approved contributions.</li>
        </ul>
      </section>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-gray-400 mt-1">{title}</div>
    </div>
  );
}
