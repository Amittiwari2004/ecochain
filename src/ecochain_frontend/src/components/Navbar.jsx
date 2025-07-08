import { Link } from "react-router-dom";
import { login, logout } from "../services/auth";
import { useUserStore } from "../context/useUserStore";

export default function Navbar() {
  const { principal, role, isAuthenticated } = useUserStore();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="EcoChain" className="h-8" />
        <Link to="/" className="hover:text-green-400">Home</Link>
        <Link to="/explore" className="hover:text-green-400">Explore</Link>
        <Link to="/submit" className="hover:text-green-400">Submit</Link>
        {role === "Validator" || role === "Admin" ? <Link to="/dao" className="hover:text-green-400">Validate</Link> : null}
      </div>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <span className="truncate max-w-xs">{principal}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <button onClick={login} className="bg-green-500 px-3 py-1 rounded">Connect</button>
        )}
      </div>
    </nav>
  );
}
