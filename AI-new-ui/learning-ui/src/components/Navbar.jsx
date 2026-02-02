import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="nav-bar">
      <h2>⚔️ LearnCraft Arena</h2>

      <div className="nav-links">
        <Link to="/search">Battle</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/analytics">War Stats</Link>
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </span>
      </div>
    </div>
  );
}
