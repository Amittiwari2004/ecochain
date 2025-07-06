use crate::types::*;
use std::cell::RefCell;
use std::collections::HashMap;
use std::vec::Vec;
use std::thread_local;

thread_local! {
    static USERS: RefCell<HashMap<String, UserProfile>> = RefCell::new(HashMap::new());
    static DATA_ENTRIES: RefCell<Vec<DataEntry>> = RefCell::new(Vec::new());
    static PROPOSALS: RefCell<Vec<Proposal>> = RefCell::new(Vec::new());
}

// ✅ New pattern: Pass logic as closure to avoid lifetime issues
pub fn with_users<R>(f: impl FnOnce(&mut HashMap<String, UserProfile>) -> R) -> R {
    USERS.with(|cell| f(&mut *cell.borrow_mut()))
}

pub fn with_data_entries<R>(f: impl FnOnce(&mut Vec<DataEntry>) -> R) -> R {
    DATA_ENTRIES.with(|cell| f(&mut *cell.borrow_mut()))
}

pub fn with_proposals<R>(f: impl FnOnce(&mut Vec<Proposal>) -> R) -> R {
    PROPOSALS.with(|cell| f(&mut *cell.borrow_mut()))
}
