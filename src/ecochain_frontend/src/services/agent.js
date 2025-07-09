import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/ecochain_backend/ecochain_backend.did.js";

export const canisterId = import.meta.env.VITE_CANISTER_ID_ECOCHAIN_BACKEND;

export async function getActor(identity) {
  // Use different hosts for production vs development
  const host = import.meta.env.MODE === "production" 
    ? "https://ic0.app" 
    : "http://localhost:4943";

  const agent = new HttpAgent({ 
    identity, 
    host,
    // Add retry configuration
    retryTimes: 3,
  });

  // Only fetch root key in development
  if (import.meta.env.MODE !== "production") {
    try {
      await agent.fetchRootKey();
    } catch (error) {
      console.warn("Failed to fetch root key:", error);
      // Continue anyway - sometimes this fails but the agent still works
    }
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
}

// Alternative function for anonymous access (for testing)
export async function getAnonymousActor() {
  const host = import.meta.env.MODE === "production" 
    ? "https://ic0.app" 
    : "http://localhost:4943";

  const agent = new HttpAgent({ host });

  if (import.meta.env.MODE !== "production") {
    try {
      await agent.fetchRootKey();
    } catch (error) {
      console.warn("Failed to fetch root key for anonymous actor:", error);
    }
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
}