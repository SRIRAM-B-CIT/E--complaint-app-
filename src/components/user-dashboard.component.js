import React, { Component } from "react";
import axios from "axios";

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complaints: [],
      username: "",
    };
  }

  componentDidMount() {
    // ✅ Get logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      this.setState({ username: storedUser.username }, this.fetchComplaints);
    } else {
      alert("Please log in first.");
    }
  }

  fetchComplaints = () => {
    axios.get("http://localhost:5000/exercises/")
      .then((response) => {
        const userComplaints = response.data.filter(
          (c) => c.username === this.state.username
        );
        this.setState({ complaints: userComplaints });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container mt-3">
        <h3 className="mb-4">User Dashboard</h3>

        {this.state.complaints.length === 0 ? (
          <p>You have not submitted any complaints yet.</p>
        ) : (
          this.state.complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="card mb-3 p-3 shadow-sm"
              style={{ borderRadius: "8px" }}
            >
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Date:</strong> {new Date(complaint.date).toDateString()}</p>
              <p><strong>Status:</strong> {complaint.status || "Pending"}</p>

              {complaint.image && (
                <div className="mb-2">
                  <strong>Your Uploaded Image:</strong><br />
                  <img
                    src={`http://localhost:5000/uploads/${complaint.image}`}
                    alt="Complaint Evidence"
                    style={{ maxWidth: "300px", borderRadius: "6px" }}
                  />
                </div>
              )}

              <div className="mt-2">
                <p><strong>Admin Response:</strong> {complaint.response || "No response yet"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
