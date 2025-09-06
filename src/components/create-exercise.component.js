import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      area: "",
      users: [],
      admins: [],
      assignedAdmin: "",
      image: null,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          const admins = response.data.filter((u) => u.role === "admin");
          this.setState({
            users: response.data.map((user) => user.username),
            admins: admins,
            username: response.data[0].username,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  onChangeDuration = (e) => {
    this.setState({ duration: e.target.value });
  };

  onChangeDate = (date) => {
    this.setState({ date: date });
  };

  onChangeImage = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  onChangeArea = (e) => {
    this.setState({ area: e.target.value });
  };

  onChangeAssignedAdmin = (e) => {
    this.setState({ assignedAdmin: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("description", this.state.description);
    formData.append("duration", this.state.duration);
    formData.append("date", this.state.date);
    formData.append("area", this.state.area);
    formData.append("assignedAdmin", this.state.assignedAdmin);
    if (this.state.image) {
      formData.append("image", this.state.image);
    }

    axios
      .post("http://localhost:5000/exercises/add", formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Create New Complaint</h3>
        <form onSubmit={this.onSubmit}>
          {/* Username dropdown */}
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Area */}
          <div className="form-group">
            <label>Area: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.area}
              onChange={this.onChangeArea}
            />
          </div>

          {/* Assigned Admin dropdown */}
          <div className="form-group">
            <label>Assign to Nearby Admin:</label>
            <select
              className="form-control"
              value={this.state.assignedAdmin}
              onChange={this.onChangeAssignedAdmin}
            >
              <option value="">Select Nearby Admin</option>
              {this.state.admins
                .filter((admin) => admin.area === this.state.area)
                .map((admin) => (
                  <option key={admin._id} value={admin._id}>
                    {admin.corporation} - {admin.area}
                  </option>
                ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          {/* Duration */}
          <div className="form-group">
            <label>Duration (minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
            </div>
          </div>

          {/* Image upload */}
          <div className="form-group">
            <label>Upload Image (optional): </label>
            <input
              type="file"
              className="form-control"
              onChange={this.onChangeImage}
            />
          </div>

          {/* Submit */}
          <div className="form-group mt-3">
            <input
              type="submit"
              value="Create Complaint"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
