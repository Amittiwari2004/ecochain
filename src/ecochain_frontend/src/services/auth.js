import { AuthClient } from "@dfinity/auth-client";
import { useUserStore } from "../context/useUserStore";
import { getActor } from "./agent";

let authClient = null;

export async function initAuth() {
  authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    const identity = authClient.getIdentity();
    const principal = identity.getPrincipal().toText();
    const actor = await getActor(identity);
    const role = await actor.get_user_role();
    useUserStore.getState().setUser(principal, role);
  }
}

export async function login() {
  if (!authClient) authClient = await AuthClient.create();
  await authClient.login({
    identityProvider: "https://identity.ic0.app/#authorize",
    onSuccess: async () => {
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal().toText();
      const actor = await getActor(identity);
      const role = await actor.get_user_role();
      useUserStore.getState().setUser(principal, role);
      window.location.reload();
    }
  });
}

export async function logout() {
  await authClient.logout();
  useUserStore.getState().clearUser();
  window.location.reload();
}

export function getIdentity() {
  return authClient.getIdentity();
}
