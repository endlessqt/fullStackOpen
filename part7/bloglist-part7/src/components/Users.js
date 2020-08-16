import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../reducers/allUsersReducer";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  const users = useSelector((state) =>
    state.users.sort((a, b) => b.blogs.length - a.blogs.length)
  );
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <Link to={`users/${user.id}`}>
              {user.username} {user.blogs.length}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
