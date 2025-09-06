import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export default function ExercisesList() {
  const { user } = useContext(AuthContext);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case "Pending":
        return <span className="badge bg-secondary">Pending</span>;
      case "Complaint Confirmed":
        return <span className="badge bg-info">Complaint Confirmed</span>;
      case "Inspection":
        return <span className="badge bg-warning">Inspection</span>;
      case "Work Started":
        return <span className="badge bg-primary">Work Started</span>;
      case "Resolved":
        return <span className="badge bg-success">Resolved</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div>
      <h3>Logged Incidents and Cases</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Description and Location</th>
            <th>Status</th>
            <th>Contact No.</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise._id}>
              <td>{exercise.username}</td>
              <td>{exercise.description}</td>
              <td>{renderStatus(exercise.status)}</td>
              <td>{exercise.contact || "N/A"}</td>
              <td>{new Date(exercise.date).toISOString().slice(0, 10)}</td>
              <td>
                {user && user.role === "admin" && (
                  <a href={`/edit/${exercise._id}`}>edit</a>
                )}
                {user && user.role === "admin" && " | "}
                <a href={`/delete/${exercise._id}`}>delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
