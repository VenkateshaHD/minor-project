import "../styles/navbar.css";

export default function Navbar() {
  return (
    <div className="nav-bar">
      <h2>⚔️ LearnCraft Arena</h2>

      <div className="nav-links">
        <a href="/search">Battle</a>
        <a href="/profile">Profile</a>
        <a href="/analytics">War Stats</a>
        <span
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </span>
      </div>
    </div>
  );
}
