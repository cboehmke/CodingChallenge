import React from 'react';
import UsersList from './UsersList';
import { connect } from 'react-redux';
import { fetchGames } from './actions';


class UsersPage extends React.Component {
componentDidMount() {
    this.props.fetchUsers();
}

    render(){
        return (
            <div>
                <h1>Users List</h1>

                <UsersList users={this.props.users} />
            </div>
        );
    }
}

UsersPage.propTypes = {
    users: React.PropTypes.array.isRequired,
    fetchUsers: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchUsers })(UsersPage);