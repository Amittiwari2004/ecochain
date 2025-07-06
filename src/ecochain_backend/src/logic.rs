use crate::storage::*;
use crate::types::*;
use crate::auth::*;
use ic_cdk::api::caller;
use std::sync::atomic::{AtomicU64, Ordering};

static DATA_ID: AtomicU64 = AtomicU64::new(1);
static PROPOSAL_ID: AtomicU64 = AtomicU64::new(1);

pub fn submit_data(content: String) {
    ensure_user_exists();
    let principal = caller();

    with_users(|users| {
        if let Some(user) = users.get_mut(&principal.to_string()) {
            user.submissions += 1;
        }
    });

    let new_entry = DataEntry {
        id: DATA_ID.fetch_add(1, Ordering::Relaxed),
        content,
        submitted_by: principal,
        status: DataStatus::Pending,
        votes_for: 0,
        votes_against: 0,
    };

    with_data_entries(|entries| {
        entries.push(new_entry);
    });
}

pub fn get_pending_data() -> Vec<DataEntry> {
    with_data_entries(|entries| {
        entries
            .iter()
            .filter(|d| d.status == DataStatus::Pending)
            .cloned()
            .collect()
    })
}

pub fn vote_on_data(id: u64, approve: bool) {
    let principal = caller();
    ensure_user_exists();

    if !is_validator(&principal) {
        ic_cdk::trap("Only validators can vote on data");
    }

    with_data_entries(|entries| {
        for data in entries.iter_mut() {
            if data.id == id && data.status == DataStatus::Pending {
                if approve {
                    data.votes_for += 1;
                } else {
                    data.votes_against += 1;
                }

                if data.votes_for >= 2 {
                    data.status = DataStatus::Validated;
                } else if data.votes_against >= 2 {
                    data.status = DataStatus::Rejected;
                }
            }
        }
    });
}

pub fn get_validated_data() -> Vec<DataEntry> {
    with_data_entries(|entries| {
        entries
            .iter()
            .filter(|d| d.status == DataStatus::Validated)
            .cloned()
            .collect()
    })
}

pub fn get_user_profile() -> Option<UserProfile> {
    ensure_user_exists();
    let principal = caller().to_string();

    with_users(|users| users.get(&principal).cloned())
}

pub fn promote_user_role(user_principal: String, new_role: Role) {
    let caller = caller();
    if !is_admin(&caller) {
        ic_cdk::trap("Only Admin can promote roles");
    }

    with_users(|users| {
        if let Some(user) = users.get_mut(&user_principal) {
            user.role = new_role;
        }
    });
}

pub fn reward_contributors() {
    with_data_entries(|entries| {
        for entry in entries.iter() {
            if entry.status == DataStatus::Validated {
                with_users(|users| {
                    if let Some(user) = users.get_mut(&entry.submitted_by.to_string()) {
                        user.tokens += 10;
                    }
                });
            }
        }
    });
}

pub fn create_proposal(title: String, description: String) {
    let principal = caller();
    ensure_user_exists();

    let proposal = Proposal {
        id: PROPOSAL_ID.fetch_add(1, Ordering::Relaxed),
        title,
        description,
        created_by: principal,
        votes_for: 0,
        votes_against: 0,
    };

    with_proposals(|proposals| {
        proposals.push(proposal);
    });
}

pub fn get_proposals() -> Vec<Proposal> {
    with_proposals(|proposals| proposals.clone())
}

pub fn get_wallet_address() -> String {
    caller().to_string()
}

pub fn get_user_role() -> Role {
    ensure_user_exists();
    let principal = caller();
    get_user_role_internal(&principal)
}

pub fn delete_data(id: u64) {
    let principal = caller();
    if !is_admin(&principal) {
        ic_cdk::trap("Only Admin can delete data");
    }

    with_data_entries(|entries| {
        entries.retain(|d| d.id != id);
    });
}
