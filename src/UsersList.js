import React from 'react';
import UserCard from './UserCard';

export default function UsersList({ users, deleteUser }) {
    const emptyMessage = (
        <p>There are no users at the moment.</p>
    );
    
    const usersList = (
        <div className="ui three cards">
            { users.map(user => <UserCard user={user} key={user._id} deleteUser={ deleteUser }/> )}
        </div>
    );
    return (
        <div> 
            {users.length === 0 ? emptyMessage : usersList}
        </div>
    );
}

UsersList.propTypes = {
    users: React.PropTypes.array.isRequired,
    deleteUser: React.PropTypes.func.isRequired
}