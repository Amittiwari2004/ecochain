import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { useInternetIdentity } from "ic-use-internet-identity";
import {useUserStore} from "./context/useUserStore";
import { useEffect } from "react";

const App = () => {
  const { identity, login, logout, loginStatus } = useInternetIdentity();
  const setUser = useUserStore((state) => state.setUser);
  const setPrincipal = useUserStore((state) => state.setPrincipal);

  useEffect(() => {
    if (identity) {
      setPrincipal(identity.getPrincipal().toText());
      setUser(identity);
    } else {
      setUser(null);
    }
  }, [identity, setPrincipal, setUser]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Navbar
        login={login}
        logout={logout}
        identity={identity}
        loginStatus={loginStatus}
      />

      <main className="flex-grow container mx-auto px-4 py-6">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
};

export default App;
