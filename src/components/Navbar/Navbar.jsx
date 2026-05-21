import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logoSvg from "../../assets/logo.svg";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoSvg} alt="TaskFlow Logo" className="logo-img" />
        <span>TaskFlow</span>
      </div>

      <div className="navbar-links">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/add-task"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Add Task
        </NavLink>
      </div>

      <div className="navbar-user">
        <span className="navbar-username">{user.name}</span>
        <button className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
