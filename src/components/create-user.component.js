import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      role: "user",
      corporation: "",
      area: "",
    };
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangeRole(e) {
    this.setState({ role: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      role: this.state.role,
      corporation: this.state.role === "admin" ? this.state.corporation : null,
      area: this.state.role === "admin" ? this.state.area : null,
    };

    console.log("Submitting user:", user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => {
        console.log(res.data);
        alert("User created successfully!");
        this.setState({ username: "", role: "user", corporation: "", area: "" });
      })
      .catch((err) => console.error("Error creating user:", err));
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>

          <div className="form-group">
            <label>Role: </label>
            <select
              className="form-control"
              value={this.state.role}
              onChange={this.onChangeRole}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* If Admin → Show Corporation & Area */}
          {this.state.role === "admin" && (
            <>
              <div className="form-group">
                <label>Municipal Corporation:</label>
                <select
                  className="form-control"
                  value={this.state.corporation}
                  onChange={(e) => this.setState({ corporation: e.target.value })}
                  required
                >
                  <option value="">Select Corporation</option>
                  <option value="road">Road Maintenance</option>
                  <option value="garbage">Garbage Cleaning</option>
                  <option value="electricity">Electricity Board</option>
                </select>
              </div>

              <div className="form-group">
                <label>Area:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.area}
                  onChange={(e) => this.setState({ area: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group mt-3">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
