import React from 'react';

export default function UserCard({ user }) {
    return (
    <div className="ui card">
        <div className="content">
            <div className="header">{user.firstName} &nbsp; {user.lastName} </div>
        </div>
    </div>
    );
}

    
            
