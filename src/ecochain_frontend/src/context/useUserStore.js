import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      // State
      principal: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      userProfile: null,
      notifications: [],
      needsRoleSelection: false, // New state for role selection flow

      // Actions
      setUser: (principal, role, isAuthenticated = true) => {
        set({ 
          principal,
          role,
          isAuthenticated,
          isLoading: false,
          needsRoleSelection: false // Reset when user is set with role
        });
      },

      clearUser: () => {
        set({ 
          principal: null,
          role: null,
          isAuthenticated: false,
          isLoading: false,
          userProfile: null,
          needsRoleSelection: false
        });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      initializeAuth: () => {
        set({ isLoading: false });
      },

      setUserProfile: (profile) => {
        set({ userProfile: profile });
      },

      updateUserRole: (newRole) => {
        set({ role: newRole });
      },

      // New action for role selection flow
      setNeedsRoleSelection: (needsRoleSelection) => {
        set({ needsRoleSelection });
      },

      // Complete role selection process
      completeRoleSelection: (selectedRole) => {
        set({ 
          role: selectedRole,
          needsRoleSelection: false
        });
      },

      addNotification: (notification) => {
        const notifications = get().notifications;
        set({ 
          notifications: [...notifications, {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            read: false,
            ...notification
          }]
        });
      },

      markNotificationAsRead: (notificationId) => {
        const notifications = get().notifications;
        const updatedNotifications = notifications.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        );
        set({ notifications: updatedNotifications });
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },

      // Getters
      getUnreadNotificationsCount: () => {
        const notifications = get().notifications;
        return notifications.filter(notif => !notif.read).length;
      },

      isAdmin: () => {
        const role = get().role;
        return role === 'Admin';
      },

      isValidator: () => {
        const role = get().role;
        return role === 'Validator' || role === 'Admin';
      },

      canValidate: () => {
        const role = get().role;
        return role === 'Validator' || role === 'Admin';
      },

      canSubmit: () => {
        const isAuthenticated = get().isAuthenticated;
        return isAuthenticated;
      },

      // New getter for role selection flow
      shouldShowRoleSelection: () => {
        const { isAuthenticated, needsRoleSelection, role } = get();
        return isAuthenticated && needsRoleSelection && !role;
      }
    }),
    {
      name: 'ecochain-user-store',
      partialize: (state) => ({
        principal: state.principal,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
        notifications: state.notifications,
        needsRoleSelection: state.needsRoleSelection
      })
    }
  )
);