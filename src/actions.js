export const SET_USERS = 'SET USERS';
export const ADD_USER = 'ADD USER';
export const USER_FETCHED = 'USER FETCHED';
export const USER_UPDATED = 'USER UPDATED';
export const USER_DELETED = 'USER DELETED';

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}


export function setUsers(users) {
    return {
        type: SET_USERS,
        users
    }
}

export function addUser(user) {
    type: ADD_USER,
    user
}

export function userUpdated(user) {
    return {
        type: USER_UPDATED,
        user
    }
}

export function userDeleted(userId) {
    return {
        type: USER_DELETED,
        userId
    }
}

export function saveUser(data) {
    return dispatch => {
        return fetch('/api/users', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(addUser(data.user)));
    }
}

export function updateUser(data) {
    return dispatch => {
        return fetch('/api/users/${data._id}', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(userUpdated(data.user)));
    }
}

export function deleteUser(id) {
    return dispatch => {
        return fetch('/api/users/${id}', {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(userDeleted(id)));
    }
}

export function userFetched(user) {
    return {
        type: USER_FETCHED,
        user

    }
}

export function fetchUser(id) {
    return dispatch => {
        fetch('/api/users/${id}')
            .then(res => res.json())
            .then(data => dispatch(userFetched(data.user)));
    }
}


export function fetchUsers() {
    return dispatch => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => dispatch(setUsers(data.users)));
    }
}