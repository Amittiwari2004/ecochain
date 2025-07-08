import { login, logout, isAuthenticated } from "../services/auth";
import { useEffect, useState } from "react";

export default function ConnectWallet() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    (async () => {
      const loggedIn = await isAuthenticated();
      setConnected(loggedIn);
    })();
  }, []);

  return connected ? (
    <button onClick={logout} className="btn-outline">Disconnect</button>
  ) : (
    <button onClick={login} className="btn-green">Connect Wallet</button>
  );
}
