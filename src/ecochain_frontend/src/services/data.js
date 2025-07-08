import { getActor } from "./agent";
import { getIdentity } from "./auth";

export async function submitData(content) {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.submit_data(content);
}

export async function getPendingData() {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.get_pending_data();
}

export async function voteOnData(id, approve) {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.vote_on_data(BigInt(id), approve);
}

export async function getValidatedData() {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.get_validated_data();
}

export async function getUserProfile() {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.get_user_profile();
}

export async function promoteUserRole(userPrincipal, newRole) {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.promote_user_role(userPrincipal, newRole);
}

export async function rewardContributors() {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.reward_contributors();
}

export async function createProposal(title, description) {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.create_proposal(title, description);
}

export async function getProposals() {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.get_proposals();
}

export async function getWalletAddress() {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.get_wallet_address();
}

export async function getUserRole() {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.get_user_role();
}

export async function deleteData(id) {
  const identity = getIdentity();
  const actor = await getActor(identity);
  return actor.delete_data(BigInt(id));
}
