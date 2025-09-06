import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateExercise from "./components/create-exercise.component";
import EditExercise from "./components/edit-exercise.component";
import ExercisesList from "./components/exercises-list.component";
import CreateUser from "./components/create-user.component";
import UserDashboard from "./components/user-dashboard.component";
import AdminDashboard from "./components/admin-dashboard.component";
import Login from "./components/login.component";

import { AuthContext, AuthProvider } from "./context/auth.context";

function App() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">Complaint App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {!user && (
              <>
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
              </>
            )}
            {user && user.role === "user" && (
              <>
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Complaints List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Complaint</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/user/dashboard" className="nav-link">User Dashboard</Link>
                </li>
                <li className="navbar-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
            {user && user.role === "admin" && (
              <>
                <li className="navbar-item">
                  <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                </li>
                <li className="navbar-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route path="/" exact>
            {user && user.role === "user" ? <ExercisesList /> : <Redirect to="/login" />}
          </Route>
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create">
            {user && user.role === "user" ? <CreateExercise /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login" exact>
            {!user ? <Login /> : <Redirect to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} />}
          </Route>
          <Route path="/signup" exact>
            {!user ? <CreateUser /> : <Redirect to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} />}
          </Route>
          <Route path="/user/dashboard">
            {user && user.role === "user" ? <UserDashboard /> : <Redirect to="/login" />}
          </Route>
          <Route path="/admin/dashboard">
            {user && user.role === "admin" ? <AdminDashboard /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
