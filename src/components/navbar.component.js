import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">wildcon online portal</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Incident Reports</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Incident Log</Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">Create User</Link>
            </li>
            <li className="navbar-item">
              <Link to="/user/dashboard" className="nav-link">User Dashboard</Link>
            </li>
            <li className="navbar-item">
              <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
