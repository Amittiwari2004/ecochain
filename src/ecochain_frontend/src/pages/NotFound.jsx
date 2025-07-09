import { Bell, User } from 'lucide-react';

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white">
      

      {/* Main Content */}
      <main className="flex items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          
          <button
            onClick={handleGoHome}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
          >
            Go to Home
          </button>
        </div>
      </main>
    </div>
  );
}