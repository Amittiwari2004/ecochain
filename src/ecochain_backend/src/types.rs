use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, CandidType, Deserialize, Serialize, PartialEq)]
pub enum DataStatus {
    Pending,
    Validated,
    Rejected,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct DataEntry {
    pub id: u64,
    pub content: String,
    pub submitted_by: Principal,
    pub status: DataStatus,
    pub votes_for: u64,
    pub votes_against: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize, PartialEq)]
pub enum Role {
    User,
    Validator,
    Admin,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct UserProfile {
    pub role: Role,
    pub submissions: u64,
    pub tokens: u64,
    pub wallet_address: String, // ✅ Add this line
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Proposal {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub created_by: Principal,
    pub votes_for: u64,
    pub votes_against: u64,
}
