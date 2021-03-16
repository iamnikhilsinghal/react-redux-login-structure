import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../../services/authService";

export default function Dashboard() {
  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/quickConnectList">Go to QuickConnectList</Link>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
