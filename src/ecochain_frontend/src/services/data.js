import { getActor } from "./agent";
import { getIdentity } from "./auth";

// Helper function to handle authentication and get actor
async function getAuthenticatedActor() {
  try {
    const identity = await getIdentity();
    const actor = await getActor(identity);
    return actor;
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication required');
  }
}

export async function submitData(content) {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.submit_data(content);
  } catch (error) {
    console.error('Error submitting data:', error);
    throw error;
  }
}

export async function getPendingData() {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.get_pending_data();
  } catch (error) {
    console.error('Error getting pending data:', error);
    throw error;
  }
}

export async function voteOnData(id, approve) {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.vote_on_data(BigInt(id), approve);
  } catch (error) {
    console.error('Error voting on data:', error);
    throw error;
  }
}

export async function getValidatedData() {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.get_validated_data();
  } catch (error) {
    console.error('Error getting validated data:', error);
    throw error;
  }
}

export async function getUserProfile() {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.get_user_profile();
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

export async function promoteUserRole(userPrincipal, newRole) {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.promote_user_role(userPrincipal, newRole);
  } catch (error) {
    console.error('Error promoting user role:', error);
    throw error;
  }
}

export async function rewardContributors() {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.reward_contributors();
  } catch (error) {
    console.error('Error rewarding contributors:', error);
    throw error;
  }
}

export async function createProposal(title, description) {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.create_proposal(title, description);
  } catch (error) {
    console.error('Error creating proposal:', error);
    throw error;
  }
}

export async function getProposals() {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.get_proposals();
  } catch (error) {
    console.error('Error getting proposals:', error);
    throw error;
  }
}

export async function getWalletAddress() {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.get_wallet_address();
  } catch (error) {
    console.error('Error getting wallet address:', error);
    throw error;
  }
}

export async function getUserRole() {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.get_user_role();
  } catch (error) {
    console.error('Error getting user role:', error);
    throw error;
  }
}

export async function deleteData(id) {
  try {
    const actor = await getAuthenticatedActor();
    return await actor.delete_data(BigInt(id));
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}