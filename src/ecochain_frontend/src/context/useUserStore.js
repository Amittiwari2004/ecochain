import { create } from "zustand";

export const useUserStore = create((set) => ({
  principal: null,
  role: null,
  isAuthenticated: false,
  setUser: (principal, role) => set({ principal, role, isAuthenticated: true }),
  clearUser: () => set({ principal: null, role: null, isAuthenticated: false })
}));
