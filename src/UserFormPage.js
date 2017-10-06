import React from 'React';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { saveUser, fetchUser, updateUser } from './actions';
import UserForm from './UserForm';

class UserFormPage extends React.Component {

    state = {
        redirect: false
    }

    componentDidMount = () => {
        const { match } = this.props;
        if (match.params._id) {
            this.props.fetchUser(match.params._id);
        }
    }

    saveUser = ({ _id, id, email, firstName, lastName, jobTitle, birthday }) => {
        if (_id) {
             return this.props.updateUser({ _id, id, email, firstName, lastName, jobTitle, birthday}).then(
                () => { this.setState({ redirect: true })},
             );
        } else {
            return this.props.saveUser({ id, email, firstName, lastName, jobTitle, birthday }).then(
                () => { this.setState({ redirect: true })},
            );
        }
    }


    render() {
        return (
            <div>
                {
                    this.state.redirect ?
                    <Redirect to="/users" /> :
                    <UserForm
                        user={ this.props.user }
                        saveUser={ this.saveUser }
                    />
                }

            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { match } = props;
    if (match.params._id) {
        return {
            user: state.users.find(item => item._id === props.params._id)
        }
    }

    return { user: null };
}

export default connect(mapStateToProps, { saveUser, fetchUser, updateUser })(UserFormPage);