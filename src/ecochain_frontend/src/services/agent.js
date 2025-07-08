import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/ecochain_backend/ecochain_backend.did.js";
import { canisterId } from "../../../declarations/ecochain_backend";

let actorCache = null;

export async function getActor(identity) {
  if (!actorCache) {
    const agent = new HttpAgent({ identity, host: window.location.origin });
    actorCache = Actor.createActor(idlFactory, { agent, canisterId });
  }
  return actorCache;
}
