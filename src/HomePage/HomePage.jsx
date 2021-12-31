import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../_actions";

import toast, { Toaster } from "react-hot-toast";

const notify3 = () => toast("пользователь удален");

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteUser(id) {
    return (e) => {
      notify3();
      this.props.deleteUser(id);
    };
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="col-xs-12 col-md-8">
        <Toaster />

        <h2> {user.firstName + user.lastName}, спасибо за регистрацию и вход в учётную запись!</h2>
        
               <p>Список учётных записей пользователей:</p>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          <ul>
            {users.items.map((user, index) => (
              <li key={user.id}>
                {user.firstName + " " + user.lastName}
                {user.deleting ? (
                  <em> - Deleting...</em>
                ) : user.deleteError ? (
                  <span className="text-danger">
                    {" "}
                    - ERROR: {user.deleteError}
                  </span>
                ) : (
                  <span>
                    {" "}
                    - <a onClick={this.handleDeleteUser(user.id)}>Удалить</a>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        <h3>
          <Link to="/login">Выйти</Link>
        </h3>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;

  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
