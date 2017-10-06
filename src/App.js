import React, { Component } from 'react';
import logo from './logo.svg';
import { Link, Route } from 'react-router-dom';
import UsersPage from './UsersPage';
import UsersList from './UsersList';
import UserFormPage from './UserFormPage';
import './App.css';

const ActiveLink = ({label, to, activeOnlyWhenExact}) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
    )} />
);

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <ActiveLink activeOnlyWhenExact to="/" label="Home" />
          <ActiveLink activeOnlyWhenExact to="/users" label="Users" />
          <ActiveLink activeOnlyWhenExact to="/users/new" label="Add new user" />
        </div>

        <Route exact path="/users" component={UserFormPage} />
        <Route path="/users/new" component={UserFormPage} />
        <Route path="/users/:_id" component={UserFormPage} />
      </div>
    );
  }
}

export default App;
