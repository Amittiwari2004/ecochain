use ic_cdk::update;
use ic_cdk::query;
use crate::logic::*;
use crate::types::*;
mod types;
mod logic;
mod storage;
mod auth;

#[update]
fn submit_data(content: String) {
    logic::submit_data(content);
}

#[query]
fn get_pending_data() -> Vec<DataEntry> {
    logic::get_pending_data()
}

#[update]
fn vote_on_data(id: u64, approve: bool) {
    logic::vote_on_data(id, approve);
}

#[query]
fn get_validated_data() -> Vec<DataEntry> {
    logic::get_validated_data()
}

#[query]
fn get_user_profile() -> Option<UserProfile> {
    logic::get_user_profile()
}

#[update]
fn promote_user_role(user_principal: String, new_role: Role) {
    logic::promote_user_role(user_principal, new_role);
}

#[update]
fn reward_contributors() {
    logic::reward_contributors();
}

#[update]
fn create_proposal(title: String, description: String) {
    logic::create_proposal(title, description);
}

#[query]
fn get_proposals() -> Vec<Proposal> {
    logic::get_proposals()
}

#[query]
fn get_wallet_address() -> String {
    logic::get_wallet_address()
}

#[query]
fn get_user_role() -> Role {
    logic::get_user_role()
}

#[update]
fn delete_data(id: u64) {
    logic::delete_data(id);
}
