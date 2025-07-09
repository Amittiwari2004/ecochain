// auth.js - Updated authentication file with role selection
import { AuthClient } from "@dfinity/auth-client";
import { useUserStore } from "../context/useUserStore";
import { getActor } from "./agent";

let authClient = null;

// Role mapping helper - converts backend role format to frontend
const mapRoleFromBackend = (backendRole) => {
  if (typeof backendRole === 'object' && backendRole !== null) {
    if (backendRole.hasOwnProperty('User')) return 'User';
    if (backendRole.hasOwnProperty('Validator')) return 'Validator';
    if (backendRole.hasOwnProperty('Admin')) return 'Admin';
  }
  // Fallback for string format or unknown format
  return backendRole || 'User';
};

// Convert frontend role to backend format
const mapRoleToBackend = (frontendRole) => {
  const roleMapping = {
    'User': { User: null },
    'Validator': { Validator: null },
    'Admin': { Admin: null }
  };
  return roleMapping[frontendRole] || { User: null };
};

export async function initAuth() {
  try {
    authClient = await AuthClient.create({
      idleOptions: {
        disableIdle: true,
        disableDefaultIdleCallback: true
      }
    });
    
    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal().toText();
      
      try {
        const actor = await getActor(identity);
        
        // Check if user is registered
        const isRegistered = await actor.is_user_registered();
        
        if (isRegistered) {
          const backendRole = await actor.get_user_role();
          const role = mapRoleFromBackend(backendRole);
          
          console.log('Auth initialized - Principal:', principal, 'Role:', role);
          useUserStore.getState().setUser(principal, role, true);
        } else {
          // User is authenticated but not registered - need role selection
          console.log('User authenticated but not registered, need role selection');
          useUserStore.getState().setUser(principal, null, true);
          useUserStore.getState().setNeedsRoleSelection(true);
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        // If there's an error, set user as authenticated but with default role
        useUserStore.getState().setUser(principal, 'User', true);
      }
    }
  } catch (error) {
    console.error('Error initializing auth:', error);
  }
}

export async function login() {
  try {
    if (!authClient) {
      authClient = await AuthClient.create({
        idleOptions: {
          disableIdle: true,
          disableDefaultIdleCallback: true
        }
      });
    }

    const isAuthenticated = await authClient.isAuthenticated();
    if (isAuthenticated) {
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal().toText();
      
      try {
        const actor = await getActor(identity);
        
        // Check if user is registered
        const isRegistered = await actor.is_user_registered();
        
        if (isRegistered) {
          const backendRole = await actor.get_user_role();
          const role = mapRoleFromBackend(backendRole);
          
          console.log('Login successful - Principal:', principal, 'Role:', role);
          useUserStore.getState().setUser(principal, role, true);
        } else {
          // User is authenticated but not registered - need role selection
          console.log('User authenticated but not registered, need role selection');
          useUserStore.getState().setUser(principal, null, true);
          useUserStore.getState().setNeedsRoleSelection(true);
        }
      } catch (error) {
        console.error('Error checking user registration during login:', error);
        // Default to User role if there's an error
        useUserStore.getState().setUser(principal, 'User', true);
      }
      return;
    }

    // Set loading state
    useUserStore.getState().setLoading(true);

    return new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: process.env.NODE_ENV === 'development' 
          ? `http://localhost:4943?canisterId=${process.env.REACT_APP_INTERNET_IDENTITY_CANISTER_ID}`
          : "https://identity.ic0.app",
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days
        onSuccess: async () => {
          try {
            const identity = authClient.getIdentity();
            const principal = identity.getPrincipal().toText();
            
            try {
              const actor = await getActor(identity);
              
              // Check if user is registered
              const isRegistered = await actor.is_user_registered();
              
              if (isRegistered) {
                const backendRole = await actor.get_user_role();
                const role = mapRoleFromBackend(backendRole);
                
                console.log('Login success callback - Principal:', principal, 'Role:', role);
                useUserStore.getState().setUser(principal, role, true);
              } else {
                // User is authenticated but not registered - need role selection
                console.log('User authenticated but not registered, need role selection');
                useUserStore.getState().setUser(principal, null, true);
                useUserStore.getState().setNeedsRoleSelection(true);
              }
            } catch (error) {
              console.error('Error in login success callback:', error);
              // Default to User role if there's an error
              useUserStore.getState().setUser(principal, 'User', true);
            }
            
            resolve();
          } catch (error) {
            console.error('Error in login success callback:', error);
            useUserStore.getState().setLoading(false);
            reject(error);
          }
        },
        onError: (error) => {
          console.error('Login error:', error);
          useUserStore.getState().setLoading(false);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error during login:', error);
    useUserStore.getState().setLoading(false);
    throw error;
  }
}

export async function logout() {
  try {
    if (authClient) {
      await authClient.logout();
      useUserStore.getState().clearUser();
      console.log('Logged out successfully');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

export async function getAuthClient() {
  if (!authClient) {
    authClient = await AuthClient.create({
      idleOptions: {
        disableIdle: true,
        disableDefaultIdleCallback: true
      }
    });
  }
  return authClient;
}

// Function to register user with selected role
export async function registerUserWithRole(selectedRole) {
  try {
    const identity = authClient.getIdentity();
    const actor = await getActor(identity);
    
    // Convert role to backend format
    const backendRole = mapRoleToBackend(selectedRole);
    
    // Call backend to register user with selected role
    const result = await actor.register_user_with_role(backendRole);
    
    if (result && result.Ok) {
      const principal = identity.getPrincipal().toText();
      useUserStore.getState().setUser(principal, selectedRole, true);
      useUserStore.getState().setNeedsRoleSelection(false);
      console.log('User registered with role:', selectedRole);
      return { success: true };
    } else {
      console.error('Registration failed:', result?.Err || 'Unknown error');
      return { success: false, error: result?.Err || 'Registration failed' };
    }
  } catch (error) {
    console.error('Error registering user with role:', error);
    return { success: false, error: error.message };
  }
}

// Function to check if user is new (needs role selection)
export async function checkUserRegistration() {
  try {
    const identity = authClient.getIdentity();
    const actor = await getActor(identity);
    
    const result = await actor.is_user_registered();
    return result;
  } catch (error) {
    console.error('Error checking user registration:', error);
    return false;
  }
}

export async function getIdentity() {
  try {
    if (!authClient) {
      authClient = await AuthClient.create({
        idleOptions: {
          disableIdle: true,
          disableDefaultIdleCallback: true
        }
      });
    }
    
    const isAuthenticated = await authClient.isAuthenticated();
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    
    return authClient.getIdentity();
  } catch (error) {
    console.error('Error getting identity:', error);
    throw error;
  }
}

// Special function to create first admin user
export async function createAdminUser() {
  try {
    const identity = authClient.getIdentity();
    const actor = await getActor(identity);
    
    // This function should only work if no admin exists
    const result = await actor.create_first_admin();
    
    if (result && result.Ok) {
      const principal = identity.getPrincipal().toText();
      useUserStore.getState().setUser(principal, 'Admin', true);
      useUserStore.getState().setNeedsRoleSelection(false);
      console.log('First admin user created');
      return { success: true };
    } else {
      console.error('Admin creation failed:', result?.Err || 'Unknown error');
      return { success: false, error: result?.Err || 'Admin creation failed' };
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
    return { success: false, error: error.message };
  }
}