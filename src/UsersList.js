import React from 'react';
import UserCard from './UserCard';

export default function UsersList({ users }) {
    const emptyMessage = (
        <p>There are no users at the moment.</p>
    );
    
    const usersList = (
        <div className="ui three cards">
            { users.map(user => <UserCard user={user} key={user._id}/> )}
        </div>
    );
    return (
        <div> 
            {users.length === 0 ? emptyMessage : usersList}
        </div>
    );
}

UsersList.propTypes = {
    users: React.PropTypes.array.isRequired
}