export const SET_USERS = 'SET USERS';
export const ADD_USER = 'ADD USER';

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


export function fetchUsers() {
    return dispatch => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => dispatch(setUsers(data.users)));
    }
}