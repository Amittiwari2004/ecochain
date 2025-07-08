import { useUserStore } from "../context/useUserStore";

export default function RoleGate({ allowedRoles, children }) {
  const { role, isAuthenticated } = useUserStore();
  if (!isAuthenticated || !allowedRoles.includes(role)) return null;
  return children;
}
