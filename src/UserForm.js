import React from 'react';
import classnames from 'classnames'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { saveUser, fetchUser, updateUser } from './actions';

class UserForm extends React.Component {
    state = {
        _id: this.props.user ? this.props.user._id : null,
        id: this.props.user ? this.props.user.id : '',
        email: this.props.user ? this.props.user.email : '',
        firstName: this.props.user ? this.props.user.firstName : '',
        lastName: this.props.user ? this.props.user.lastName : '',
        jobTitle: this.props.user ? this.props.user.jobTitle : '',
        birthday: this.props.user ? this.props.user.birthday : '',
        errors: {},
        loading: false
    }

    componentWillRecieveProps = (nextProps) => {
        this.setState({
            _id: nextProps.user._id,
            id: nextProps.user.id,
            email: nextProps.user.email,
            firstName: nextProps.user.firstName,
            lastName: nextProps.user.lastName,
            jobTitle: nextProps.user.jobTitle,
            birthday: nextProps.user.birthday
        })
    }

 

    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors
                }); 
            } else {
                this.setState({ [e.target.name]: e.target.value });
            }
            
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // validation
        let errors = {};
        if (this.state.id === '') errors.id = "Can't be empty";
        if (this.state.email === '') errors.email = "Can't be empty";
        if (this.state.firstName === '') errors.firstName = "Can't be empty";
        if (this.state.lastName === '') errors.lastName = "Can't be empty";
        if (this.state.jobTitle === '') errors.jobTitle = "Can't be empty";
        if (this.state.birthday === '') errors.birthday = "Can't be empty";
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0

        if (isValid) {
            const { _id, id, email, firstName, lastName, jobTitle, birthday } = this.state;
            this.setState({ loading: true });
       
            this.props.saveGame({ _id, id, email, firstName, lastName, jobTitle, birthday }).then(
                () =>  { this.setState({ done: true })},
                (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false}))
            );
        }

    }

    render() {
        const form = (
            <form className={classnames('ui', 'form', { loading: this.state.loading})} onSubmit={this.handleSubmit}>
            <h1> Add new user </h1>

            {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

            <div className={classnames("field", { error: !!this.state.errors.id })}>
                <label htmlFor="id">ID</label>
                <input
                    id="id"
                    value={this.state.email}
                    name="id"
                />
                <span>{this.state.errors.id}</span>
            </div>

            <div className={classnames("field", { error: !!this.state.errors.email })}>>
                <label htmlFor="email">ID</label>
                <input
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <span>{this.state.errors.email}</span>
            </div>

            <div className={classnames("field", { error: !!this.state.errors.firstName })}>>
                <label htmlFor="firstName">ID</label>
                <input
                    name="firstName"
                    id="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                  <span>{this.state.errors.firstName}</span>
            </div>

            <div className={classnames("field", { error: !!this.state.errors.lastName })}>>
                <label htmlFor="lastName">ID</label>
                <input
                    name="lastName"
                    id="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                  <span>{this.state.errors.lastName}</span>
            </div>

            <div className={classnames("field", { error: !!this.state.errors.jobTitle })}>>
                <label htmlFor="jobTitle">ID</label>
                <input
                    name="jobTitle"
                    id="jobTitle"
                    value={this.state.jobTitle}
                    onChange={this.handleChange}
                  />
                  <span>{this.state.errors.jobTitle}</span>
            </div>

            <div className={classnames("field", { error: !!this.state.errors.birthday })}>>
                <label htmlFor="birthday">ID</label>
                <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.handleChange}
                  />
                  <span>{this.state.errors.birthday}</span>
            </div>

            <div className="field">
                <button className="ui primary button">Save</button>
            </div>
        </form>
        )
        return (
            <div>
                { form }
           </div>
        );
    }
}

export default UserForm;