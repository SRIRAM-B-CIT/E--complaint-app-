import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Login() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    axios.get("http://localhost:5000/users/")
      .then(res => {
        const user = res.data.find(u => u.username === username && u.role === role);
        if (user) {
          login(user);
          if (role === "admin") {
            history.push("/admin/dashboard");
          } else {
            history.push("/user/dashboard");
          }
        } else {
          setError("Invalid username or role");
        }
      })
      .catch(err => {
        setError("Error during login");
      });
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Role: </label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-group mt-3">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
