import React from 'react';
import { Link } from 'react-router-dom';
import { deleteUser } from './actions'

export default function UserCard({ user }) {
    return (
    <div className="ui card">
        <div className="content">
            <div className="header">{user.firstName} &nbsp; {user.lastName} </div>
        </div>
    
        <div className="extra content">
            <div className=" ui two buttons">
                <Link to={ '/user/${user._id}' }  className="ui basic button green">Edit</Link>
                <div className="ui basic button red" onClick={ () => deleteUser(user._id)}>Delete</div>
            </div>
        </div>
    </div>

    );

    UserCard.PropTypes = {
        user: React.PropTypes.object.isRequired
    }
}



    
            
