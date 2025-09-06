import React, { Component } from "react";
import axios from "axios";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complaints: [],
      responses: {}, // store admin response input temporarily
      statusOptions: [
        "Pending",
        "Complaint Confirmed",
        "Inspection",
        "Work Started",
        "Resolved",
      ],
      statusUpdates: {}, // store status updates temporarily
    };
  }

  componentDidMount() {
    this.fetchComplaints();
  }

  // ✅ Fetch all complaints
  fetchComplaints = () => {
    axios.get("http://localhost:5000/exercises/")
      .then((response) => {
        this.setState({ complaints: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ✅ Update response input in state
  handleChange = (id, value) => {
    this.setState((prevState) => ({
      responses: { ...prevState.responses, [id]: value },
    }));
  };

  // ✅ Update status input in state
  handleStatusChange = (id, value) => {
    this.setState((prevState) => ({
      statusUpdates: { ...prevState.statusUpdates, [id]: value },
    }));
  };

  // ✅ Submit response to backend
  handleRespond = (id) => {
    const responseText = this.state.responses[id];
    const statusText = this.state.statusUpdates[id];
    if (!responseText && !statusText) return alert("Please enter a response or update status");

    const updateData = {};
    if (responseText) updateData.response = responseText;
    if (statusText) updateData.status = statusText;

    axios.post(`http://localhost:5000/exercises/respond/${id}`, updateData)
    .then(() => {
      alert("Response and/or status saved!");
      this.fetchComplaints(); // refresh list
      this.setState((prevState) => ({
        responses: { ...prevState.responses, [id]: "" },
        statusUpdates: { ...prevState.statusUpdates, [id]: "" },
      }));
    })
    .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="container mt-3">
        <h3 className="mb-4">Admin Dashboard</h3>

        {this.state.complaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          this.state.complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="card mb-3 p-3 shadow-sm"
              style={{ borderRadius: "8px" }}
            >
              <h5>{complaint.username}</h5>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Duration:</strong> {complaint.duration} mins</p>
              <p><strong>Date:</strong> {new Date(complaint.date).toDateString()}</p>
              <p><strong>Status:</strong> {complaint.status || "Pending"}</p>

              {complaint.image && (
                <div className="mb-2">
                  <strong>Uploaded Image:</strong><br />
                  <img
                    src={`http://localhost:5000/uploads/${complaint.image}`}
                    alt="Complaint Evidence"
                    style={{ maxWidth: "300px", borderRadius: "6px" }}
                  />
                </div>
              )}

              <div className="mt-2">
                <p><strong>Admin Response:</strong> {complaint.response || "No response yet"}</p>

                <textarea
                  className="form-control mb-2"
                  placeholder="Write or update a response..."
                  value={this.state.responses[complaint._id] || ""}
                  onChange={(e) => this.handleChange(complaint._id, e.target.value)}
                />

                <select
                  className="form-control mb-2"
                  value={this.state.statusUpdates[complaint._id] || complaint.status || "Pending"}
                  onChange={(e) => this.handleStatusChange(complaint._id, e.target.value)}
                >
                  {this.state.statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  className="btn btn-success"
                  onClick={() => this.handleRespond(complaint._id)}
                >
                  {complaint.response ? "Update Response" : "Respond"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
