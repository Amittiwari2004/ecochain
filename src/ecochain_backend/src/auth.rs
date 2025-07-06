use crate::types::*;
use crate::storage::*;
use ic_cdk::api::caller;
use candid::Principal;  // ✅ Fixed here

pub fn ensure_user_exists() {
    let principal = caller();
    with_users(|users| {
        users.entry(principal.to_string()).or_insert(UserProfile {
            role: Role::User,
            submissions: 0,
            tokens: 0,
            wallet_address: principal.to_string(), // make sure wallet_address is added to UserProfile
        });
    });
}

pub fn is_validator(principal: &Principal) -> bool {
    with_users(|users| {
        users
            .get(&principal.to_string())
            .map(|user| user.role == Role::Validator)
            .unwrap_or(false)
    })
}

pub fn is_admin(principal: &Principal) -> bool {
    with_users(|users| {
        users
            .get(&principal.to_string())
            .map(|user| user.role == Role::Admin)
            .unwrap_or(false)
    })
}

pub fn get_user_role_internal(principal: &Principal) -> Role {
    with_users(|users| {
        users
            .get(&principal.to_string())
            .map(|user| user.role.clone())
            .unwrap_or(Role::User)
    })
}
